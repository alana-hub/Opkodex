import { APP_CONFIG } from "../config.js";
import { getHospitalById } from "../data/hospitals.js";
import { getLocationGroup, rubavuLocationGroups } from "../data/locations.js";
import { collectFileUploads, validateDocumentFile } from "../utils/files.js";
import { isFutureOrToday, isValidEmail, isValidNin, isValidRwandaPhone, setFieldValidity, showMessage } from "../utils/validation.js";
import { formatDateDisplay, formatFileSize } from "../utils/format.js";
function value(id) {
    const element = document.getElementById(id);
    return element?.value.trim() ?? "";
}
function file(id) {
    const input = document.getElementById(id);
    return input?.files?.[0] ?? null;
}
function setText(id, content) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = content;
    }
}
function populateSelect(select, values, placeholder) {
    select.innerHTML = "";
    const placeholderOption = document.createElement("option");
    placeholderOption.value = "";
    placeholderOption.textContent = placeholder;
    select.appendChild(placeholderOption);
    values.forEach((value) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
    });
}
function initializeLocationSelectors() {
    const province = document.querySelector("#province");
    const district = document.querySelector("#district");
    const sector = document.querySelector("#sector");
    const cell = document.querySelector("#cell");
    const village = document.querySelector("#village");
    if (!province || !district || !sector || !cell || !village)
        return;
    const districtOptions = ["Rubavu"];
    populateSelect(district, districtOptions, "Select district");
    populateSelect(sector, [], "Select district first");
    populateSelect(cell, [], "Select sector first");
    populateSelect(village, [], "Select cell first");
    province.value = "Western Province";
    district.value = "Rubavu";
    populateSelect(sector, rubavuLocationGroups.map((item) => item.sector), "Select sector");
    district.addEventListener("change", () => {
        if (district.value !== "Rubavu") {
            populateSelect(sector, [], "Select a supported district");
            populateSelect(cell, [], "Select sector first");
            populateSelect(village, [], "Select cell first");
            return;
        }
        populateSelect(sector, rubavuLocationGroups.map((item) => item.sector), "Select sector");
        populateSelect(cell, [], "Select sector first");
        populateSelect(village, [], "Select cell first");
    });
    sector.addEventListener("change", () => {
        const group = getLocationGroup(sector.value);
        populateSelect(cell, group?.cells ?? [], group ? "Select cell" : "Select sector first");
        populateSelect(village, [], "Select cell first");
    });
    cell.addEventListener("change", () => {
        const group = getLocationGroup(sector.value);
        const villages = group?.villages[cell.value] ?? [];
        populateSelect(village, villages, villages.length > 0
            ? "Select village"
            : "Village list unavailable for this cell");
    });
}
function initializeDate() {
    const input = document.querySelector("#visitDate");
    if (!input)
        return;
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    input.min = today;
}
function initializeNin() {
    const input = document.querySelector("#nin");
    input?.addEventListener("input", () => {
        input.value = input.value
            .replace(/\D/g, "")
            .slice(0, 16);
    });
}
function initializeFilePreview() {
    const inputIds = [
        "idDocument",
        "insuranceDocument"
    ];
    inputIds.forEach((id) => {
        const input = document.getElementById(id);
        const preview = document.getElementById(`${id}Preview`);
        if (!input || !preview)
            return;
        input.addEventListener("change", () => {
            const selected = input.files?.[0] ?? null;
            const error = validateDocumentFile(selected);
            if (error) {
                input.value = "";
                setFieldValidity(id, error);
                preview.textContent = error;
                preview.className =
                    "file-preview file-preview--error";
                return;
            }
            setFieldValidity(id, "");
            if (selected) {
                preview.textContent =
                    `${selected.name} · ${formatFileSize(selected.size)}`;
                preview.className =
                    "file-preview file-preview--success";
            }
        });
    });
}
function validateForm(form) {
    const nin = value("nin");
    const email = value("email");
    const phone = value("phone");
    const visitDate = value("visitDate");
    setFieldValidity("nin", isValidNin(nin)
        ? ""
        : "National ID / NIN must contain exactly 16 digits.");
    setFieldValidity("email", isValidEmail(email)
        ? ""
        : "Enter a valid email address.");
    setFieldValidity("phone", isValidRwandaPhone(phone)
        ? ""
        : "Enter a valid Rwanda phone number.");
    setFieldValidity("visitDate", isFutureOrToday(visitDate)
        ? ""
        : "Visit date must be today or a future date.");
    const idError = validateDocumentFile(file("idDocument"));
    const insuranceError = validateDocumentFile(file("insuranceDocument"));
    setFieldValidity("idDocument", idError ?? "");
    setFieldValidity("insuranceDocument", insuranceError ?? "");
    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }
    return true;
}
function buildPayload(hospitalId) {
    const dependentName = value("dependentName");
    const relationship = value("relationship");
    return {
        hospitalId,
        primarySponsor: {
            fullName: value("fullName"),
            nin: value("nin"),
            dateOfBirth: value("dob"),
            occupation: value("occupation"),
            phone: value("phone"),
            email: value("email")
        },
        address: {
            province: value("province"),
            district: value("district"),
            sector: value("sector"),
            cell: value("cell"),
            village: value("village")
        },
        dependent: dependentName
            ? {
                fullName: dependentName,
                relationship
            }
            : null,
        insurance: {
            provider: value("insuranceProvider"),
            policyId: value("policyId")
        },
        documents: collectFileUploads(file("idDocument"), file("insuranceDocument")),
        visit: {
            date: value("visitDate"),
            department: value("department")
        },
        consentAccepted: document.querySelector("#consent")?.checked ?? false,
        submittedAt: new Date().toISOString()
    };
}
function createReference() {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "SC-";
    for (let i = 0; i < 8; i++) {
        result +=
            alphabet[Math.floor(Math.random() *
                alphabet.length)];
    }
    return result;
}
async function submitRegistration(payload) {
    if (APP_CONFIG.demoMode) {
        return {
            success: true,
            reference: createReference()
        };
    }
    const response = await fetch(APP_CONFIG.registrationEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(payload)
    });
    if (!response.ok) {
        throw new Error(`Registration failed with status ${response.status}.`);
    }
    const data = (await response.json());
    return {
        success: true,
        reference: data.reference ??
            createReference()
    };
}
function showReview(payload, hospitalName, reference) {
    setText("successHospital", hospitalName);
    setText("successReference", reference);
    setText("successVisitDate", formatDateDisplay(payload.visit.date));
    setText("successDepartment", payload.visit.department);
    document
        .getElementById("registrationForm")
        ?.classList.add("hidden");
    document
        .getElementById("successPanel")
        ?.classList.remove("hidden");
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
export function initRegisterPage() {
    const form = document.querySelector("#registrationForm");
    if (!form)
        return;
    initializeLocationSelectors();
    initializeDate();
    initializeNin();
    initializeFilePreview();
    const params = new URLSearchParams(window.location.search);
    const hospital = getHospitalById(params.get("hospital"));
    const formMessage = document.querySelector("#formMessage");
    if (!hospital) {
        setText("selectedHospitalName", "No hospital selected");
        setText("selectedHospitalLocation", "Please return to Find Hospitals and select a partner facility.");
        form.querySelectorAll("input, select, button")
            .forEach((element) => {
            element.disabled = true;
        });
        return;
    }
    setText("selectedHospitalName", hospital.name);
    setText("selectedHospitalLocation", hospital.location);
    setText("selectedHospitalServices", hospital.specialties.join(" · "));
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!validateForm(form)) {
            showMessage(formMessage, "Please review the required fields and correct the highlighted information.", "error");
            return;
        }
        const consent = document.querySelector("#consent");
        if (!consent?.checked) {
            showMessage(formMessage, "Please confirm that you understand how your registration information will be used.", "error");
            return;
        }
        const payload = buildPayload(hospital.id);
        const button = document.querySelector("#submitButton");
        try {
            if (button) {
                button.disabled = true;
                button.textContent =
                    "Submitting…";
            }
            showMessage(formMessage, APP_CONFIG.demoMode
                ? "Preparing your demonstration registration…"
                : "Submitting your registration securely…", "info");
            const result = await submitRegistration(payload);
            if (result.success) {
                showReview(payload, hospital.name, result.reference);
            }
        }
        catch (error) {
            console.error(error);
            showMessage(formMessage, "We could not submit the registration. Please check your connection and try again.", "error");
        }
        finally {
            if (button) {
                button.disabled = false;
                button.textContent =
                    "Submit Registration";
            }
        }
    });
}
//# sourceMappingURL=register.js.map