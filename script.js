
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('premium-form');
            const versionOptions = document.querySelectorAll('.radio-option');
            const paymentMethods = document.querySelectorAll('.payment-method');
            const versionInput = document.getElementById('version');
            const paymentMethodInput = document.getElementById('paymentMethod');
            const formContainer = document.getElementById('form-container');
            const loadingElement = document.getElementById('loading');
            const successPage = document.getElementById('success-page');
            const errorPage = document.getElementById('error-page');
            const successBackBtn = document.getElementById('success-back');
            const errorBackBtn = document.getElementById('error-back');
            
            // Handle version selection
            versionOptions.forEach(option => {
                option.addEventListener('click', function() {
                    versionOptions.forEach(o => o.classList.remove('selected'));
                    this.classList.add('selected');
                    versionInput.value = this.getAttribute('data-value');
                });
            });
            
            // Handle payment method selection
            paymentMethods.forEach(method => {
                method.addEventListener('click', function() {
                    paymentMethods.forEach(m => m.classList.remove('selected'));
                    this.classList.add('selected');
                    paymentMethodInput.value = this.getAttribute('data-method');
                });
            });
            
            // Back button handlers
            successBackBtn.addEventListener('click', function(e) {
                e.preventDefault();
                successPage.classList.add('hidden');
                formContainer.classList.remove('hidden');
                form.reset();
                versionOptions.forEach(o => o.classList.remove('selected'));
                paymentMethods.forEach(m => m.classList.remove('selected'));
            });
            
            errorBackBtn.addEventListener('click', function(e) {
                e.preventDefault();
                errorPage.classList.add('hidden');
                formContainer.classList.remove('hidden');
            });
            
            // Form submission
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Basic validation
                if (!versionInput.value) {
                    alert('Please select a version');
                    return;
                }
                
                if (!paymentMethodInput.value) {
                    alert('Please select a payment method');
                    return;
                }
                
                // Show loading state
                formContainer.classList.add('hidden');
                loadingElement.style.display = 'block';
                
                // Get form data
                const formData = new FormData(form);
                const data = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    version: formData.get('version'),
                    paymentMethod: formData.get('paymentMethod'),
                    message: formData.get('message'),
                    timestamp: new Date().toLocaleString()
                };
                
                // Send data to Google Sheets
                fetch('https://script.google.com/macros/s/AKfycbxaHE_54_9X4us3WPQR3W9RxuA7ZqOAQvRxRW7Inogzo57QWRkqPEUhxWRem87qH71Aeg/exec', {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
                .then(() => {
                    // Hide loading and show success page
                    loadingElement.style.display = 'none';
                    successPage.classList.remove('hidden');
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Hide loading and show error page
                    loadingElement.style.display = 'none';
                    errorPage.classList.remove('hidden');
                });
            });
        });
    
