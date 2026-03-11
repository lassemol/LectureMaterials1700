document.addEventListener("DOMContentLoaded", function () {
    const bookButton = document.getElementById("book-room-button")
    const confirmPurchaseBtn = document.getElementById("confirm-booking");
    const bookToast = new bootstrap.Toast(document.getElementById("book-toast"));
    const modal = new bootstrap.Modal(document.getElementById("book-modal"));

    //
    // bookButton.addEventListener("click", function () {
    // });

    // Handle purchase confirmation
    confirmPurchaseBtn.addEventListener("click", function () {
        modal.hide();
        bookToast.show();
    });
});