// Mobile filter modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileFilterBtn = document.getElementById('mobileFilterBtn');
    const mobileFilterModal = document.getElementById('mobileFilterModal');
    const closeMobileFilter = document.getElementById('closeMobileFilter');

    // Open mobile filter modal
    mobileFilterBtn?.addEventListener('click', () => {
        mobileFilterModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });

    // Close mobile filter modal
    closeMobileFilter?.addEventListener('click', () => {
        mobileFilterModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking on backdrop
    mobileFilterModal?.addEventListener('click', (e) => {
        if (e.target === mobileFilterModal) {
            mobileFilterModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mobileFilterModal.classList.contains('hidden')) {
            mobileFilterModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
});
