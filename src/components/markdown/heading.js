
function init(){
    const copyIcons = document.querySelectorAll('.icon.copy');
    copyIcons.forEach(icon => {
      icon.addEventListener('click', function() {
        // Copy data-sid to clipboard
        const sid = this.getAttribute('data-sid');
        const url = `${window.location.origin}/${sid}`;
        navigator.clipboard.writeText(url).then(() => {
          // Show success message
          const message = document.createElement('span');
          message.textContent = 'Copied!';
          message.style.position = 'absolute';
          message.style.left = '100%';
          message.style.top = '0';
          //message.style.backgroundColor = 'white';
          message.style.color = 'white';
          //message.style.border = '1px solid black';
          message.style.padding = '2px 8px';
          message.style.fontSize = '0.75rem';
          message.style.marginLeft = '10px';
          this.appendChild(message);

          // Remove the message after 1 second
          setTimeout(() => {
            this.removeChild(message);
          }, 1000);
        }).catch(err => {
          console.error('Failed to copy text: ', err);
        });
      });
    });
}

document.addEventListener('DOMContentLoaded', init);  

