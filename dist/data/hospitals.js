export const hospitals = [
    {
        id: "la-charite",
        name: "Polyclinique La Charité",
        location: "Rubavu / Gisenyi, Western Province",
        district: "Rubavu",
        province: "Western Province",
        specialties: [
            "General Consultation",
            "Pediatrics",
            "Maternity",
            "Laboratory",
            "Emergency Care"
        ],
        insurance: [
            "Mutuelle de Santé (CBHI)",
            "RSSB / RAMA",
            "Eden Care",
            "Sanlam",
            "UAP",
            "Radiant",
            "Cash / Self-Pay"
        ],
        description: "Featured SmartCare Rwanda partner facility for the prototype registration flow.",
        registrationUrl: "./register.html?hospital=la-charite",
        featured: true
    }
];
export function getHospitalById(id) {
    if (!id)
        return null;
    return hospitals.find((hospital) => hospital.id === id) ?? null;
}
//# sourceMappingURL=hospitals.js.map