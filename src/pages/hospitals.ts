import { hospitals } from "../data/hospitals.js";
import type { Hospital } from "../types/smartcare.js";
import { escapeHtml } from "../utils/format.js";

function renderHospital(hospital: Hospital): string {
  const services = hospital.specialties
    .map(
      (service) =>
        `<span class="tag">${escapeHtml(service)}</span>`
    )
    .join("");

  const insurance = hospital.insurance
    .map(
      (provider) =>
        `<span>${escapeHtml(provider)}</span>`
    )
    .join(" · ");

  return `
    <article class="hospital-card">
      <div class="hospital-card__visual">
        <div class="hospital-card__icon" aria-hidden="true">+</div>
      </div>

      <div class="hospital-card__body">
        <div class="hospital-card__heading">
          <div>
            <span class="eyebrow">Partner facility</span>
            <h2>${escapeHtml(hospital.name)}</h2>
            <p class="location">📍 ${escapeHtml(hospital.location)}</p>
          </div>
          ${
            hospital.featured
              ? `<span class="status-badge">Featured</span>`
              : ""
          }
        </div>

        <p class="muted">${escapeHtml(hospital.description)}</p>

        <h3>Available services</h3>
        <div class="tag-list">${services}</div>

        <h3>Insurance / payment</h3>
        <p class="insurance-list">${insurance}</p>

        <a class="button button--primary button--full"
           href="${hospital.registrationUrl}">
          Select & Register at This Hospital
        </a>
      </div>
    </article>
  `;
}


function renderNearbyHospital(hospital: Hospital): string {
  const services = hospital.specialties
    .slice(0, 5)
    .map((service) => `<span class="tag">${escapeHtml(service)}</span>`)
    .join("");

  return `
    <div class="nearby-hospital-card">
      <div>
        <span class="eyebrow">Nearby partner hospital</span>
        <h2>${escapeHtml(hospital.name)}</h2>
        <p class="location">📍 ${escapeHtml(hospital.location)}</p>
        <p class="muted">${escapeHtml(hospital.description)}</p>
        <div class="tag-list">${services}</div>
      </div>
      <div class="nearby-hospital-card__action">
        <span class="status-badge">SmartCare Available</span>
        <a class="button button--primary" href="./register.html?hospital=${encodeURIComponent(hospital.id)}">
          Select Hospital →
        </a>
      </div>
    </div>
  `;
}

export function initHospitalsPage(): void {
  const grid =
    document.querySelector<HTMLDivElement>(
      "#hospitalGrid"
    );

  const search =
    document.querySelector<HTMLInputElement>(
      "#hospitalSearch"
    );

  const district =
    document.querySelector<HTMLSelectElement>(
      "#districtFilter"
    );

  const empty =
    document.querySelector<HTMLDivElement>(
      "#noHospitals"
    );

  const resultsCount =
    document.querySelector<HTMLElement>(
      "#resultsCount"
    );

  const nearbyHospital =
    document.querySelector<HTMLElement>(
      "#nearbyHospital"
    );

  if (!grid || !search || !district || !empty) {
    return;
  }

  const render = (): void => {
    const featuredHospital = hospitals.find((hospital) => hospital.featured) ?? hospitals[0];

    if (nearbyHospital && featuredHospital) {
      nearbyHospital.innerHTML = renderNearbyHospital(featuredHospital);
    }
    const query = search.value
      .trim()
      .toLowerCase();

    const selectedDistrict =
      district.value;

    const filtered = hospitals.filter(
      (hospital) => {
        const haystack = [
          hospital.name,
          hospital.location,
          hospital.district,
          hospital.province,
          ...hospital.specialties,
          ...hospital.insurance
        ]
          .join(" ")
          .toLowerCase();

        const matchesSearch =
          !query ||
          haystack.includes(query);

        const matchesDistrict =
          selectedDistrict === "all" ||
          hospital.district ===
            selectedDistrict;

        return (
          matchesSearch &&
          matchesDistrict
        );
      }
    );

    grid.innerHTML = filtered
      .map(renderHospital)
      .join("");

    empty.classList.toggle(
      "hidden",
      filtered.length > 0
    );

    if (resultsCount) {
      resultsCount.textContent =
        `${filtered.length} partner ${filtered.length === 1 ? "hospital" : "hospitals"} found`;
    }
  };

  search.addEventListener("input", render);
  district.addEventListener("change", render);

  render();
}
