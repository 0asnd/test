// Apply tab cloak settings on page load
function applyTabSettings() {
    // Check for custom tab data first
    const customFavicon = localStorage.getItem('customFavicon');
    const customTitle = localStorage.getItem('customTitle');
    
    if (customFavicon || customTitle) {
        // Apply custom tab data if available
        if (customFavicon) {
            const faviconLink = document.querySelector('link[rel="icon"]') || 
                                document.createElement('link');
            faviconLink.type = 'image/x-icon';
            faviconLink.rel = 'icon';
            faviconLink.href = customFavicon;
            document.head.appendChild(faviconLink);
        }
        
        if (customTitle) {
            document.title = customTitle;
        }
    } else {
        // Otherwise check for preset cloak
        const cloakType = localStorage.getItem('cloakType');
        if (cloakType) {
            let title, faviconUrl;
            
            switch(cloakType) {
                case 'google':
                    title = 'Google';
                    faviconUrl = 'https://www.google.com/favicon.ico';
                    break;
                case 'clever':
                    title = 'Clever | Portal';
                    faviconUrl = 'https://clever.com/favicon.ico';
                    break;
                case 'canvas':
                    title = 'Dashboard';
                    faviconUrl = 'https://canvas.instructure.com/favicon.ico';
                    break;
                case 'classroom':
                    title = 'Classes';
                    faviconUrl = 'https://classroom.google.com/favicon.ico';
                    break;
            }
            
            if (title) document.title = title;
            if (faviconUrl) {
                const faviconLink = document.querySelector('link[rel="icon"]') || 
                                    document.createElement('link');
                faviconLink.type = 'image/x-icon';
                faviconLink.rel = 'icon';
                faviconLink.href = faviconUrl;
                document.head.appendChild(faviconLink);
            }
        }
    }
}

// Function to create a new window with an iframe
function create(url) {
    var win = window.open();
    win.document.body.style.margin = '0';
    win.document.body.style.height = '100vh';
    
    var iframe = win.document.createElement('iframe');
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.margin = '0';
    iframe.src = url;
    win.document.body.appendChild(iframe);
    
    // Apply tab cloak settings to the new window
    const customFavicon = localStorage.getItem('customFavicon');
    const customTitle = localStorage.getItem('customTitle');
    const cloakType = localStorage.getItem('cloakType');
    
    if (customFavicon) {
        const faviconLink = win.document.createElement('link');
        faviconLink.rel = 'icon';
        faviconLink.href = customFavicon;
        win.document.head.appendChild(faviconLink);
    } else if (cloakType) {
        let faviconUrl;
        switch(cloakType) {
            case 'google': faviconUrl = 'https://www.google.com/favicon.ico'; break;
            case 'clever': faviconUrl = 'https://clever.com/favicon.ico'; break;
            case 'canvas': faviconUrl = 'https://canvas.instructure.com/favicon.ico'; break;
            case 'classroom': faviconUrl = 'https://classroom.google.com/favicon.ico'; break;
        }
        if (faviconUrl) {
            const faviconLink = win.document.createElement('link');
            faviconLink.rel = 'icon';
            faviconLink.href = faviconUrl;
            win.document.head.appendChild(faviconLink);
        }
    }
    
    if (customTitle) {
        win.document.title = customTitle;
    } else if (cloakType) {
        switch(cloakType) {
            case 'google': win.document.title = 'Google'; break;
            case 'clever': win.document.title = 'Clever | Portal'; break;
            case 'canvas': win.document.title = 'Dashboard'; break;
            case 'classroom': win.document.title = 'Classes'; break;
        }
    }
}

// Function for navigation buttons
function navigateTo(url) {
    const gatekeepEnabled = localStorage.getItem('gatekeepMode') === 'true';
    if (gatekeepEnabled) {
        create(url);
    } else {
        window.location.href = url;
    }
}

// Function for handling link clicks
function handleLink(event, url) {
    const gatekeepEnabled = localStorage.getItem('gatekeepMode') === 'true';
    if (gatekeepEnabled) {
        event.preventDefault();
        create(url);
    }
}

// Initialize everything when the page loads
function initializePage() {
    // Apply tab settings
    applyTabSettings();
    
    // Add click handler for links if gatekeep mode is enabled
    const gatekeepEnabled = localStorage.getItem('gatekeepMode') === 'true';
    if (gatekeepEnabled) {
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            if (link && link.href && !link.hasAttribute('data-no-gatekeep') && !link.onclick) {
                e.preventDefault();
                create(link.href);
            }
        });
    }
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);