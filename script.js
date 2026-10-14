/* letter-by-letter wave heading */
document.querySelectorAll('.wave').forEach(function(el){
  var i = 0;
  function walk(node){
    Array.from(node.childNodes).forEach(function(c){
      if (c.nodeType === 3) {
        var frag = document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach(function(part){
          if (part === '') return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
          var w = document.createElement('span');
          w.className = 'word';
          Array.from(part).forEach(function(ch){
            var s = document.createElement('span');
            s.className = 'ch';
            s.textContent = ch;
            s.style.animationDelay = (-i * 0.15) + 's';
            i++;
            w.appendChild(s);
          });
          frag.appendChild(w);
        });
        c.replaceWith(frag);
      } else if (c.nodeType === 1 && c.tagName !== 'BR') {
        walk(c);
      }
    });
  }
  walk(el);
});

/* cards fade-rise on scroll */
(function(){
  var items = document.querySelectorAll('.service,.package,.why-card,.contact-card,.gallery div,.section-head');
  if (!('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  items.forEach(function(el, idx){
    el.classList.add('reveal');
    el.style.transitionDelay = ((idx % 5) * 0.08) + 's';
    io.observe(el);
  });
})();

function sendWhatsApp(e){
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !phone) {
    alert('Please enter your name and phone number.');
    return;
  }

  const text =
    "Hello Murugan Construction!\n\n" +
    "Name: " + name + "\n" +
    "Phone: " + phone + "\n" +
    "Service: " + (service || "Not specified") + "\n" +
    "Project Details: " + (message || "Not specified");

  const whatsappUrl =
    "https://wa.me/917708183364?text=" + encodeURIComponent(text);

  window.open(whatsappUrl, "_blank");
}