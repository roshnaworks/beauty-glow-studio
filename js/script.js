const observer = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); } });
  }, {threshold:0.15});
  document.querySelectorAll('.fade-up').forEach(el=>observer.observe(el));

  // Booking form submission
  const bookingForm = document.querySelector('#booking form');
  if(bookingForm){
    bookingForm.addEventListener('submit', async function(e){
      e.preventDefault();
      const btn = bookingForm.querySelector('button');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';

      const formData = {
        name: bookingForm.querySelector('input[type="text"]').value,
        phone: bookingForm.querySelector('input[type="tel"]').value,
        email: bookingForm.querySelector('input[type="email"]').value,
        service: bookingForm.querySelector('select').value,
        date: bookingForm.querySelector('input[type="date"]').value,
        notes: bookingForm.querySelector('textarea').value
      };

      try{
        const res = await fetch('https://YOUR-BACKEND-URL.onrender.com/api/booking', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify(formData)
        });
        if(res.ok){
          btn.textContent = 'Booked! ✓';
          bookingForm.reset();
        } else {
          btn.textContent = 'Failed, try again';
        }
      } catch(err){
        btn.textContent = 'Failed, try again';
      }
      setTimeout(()=>{ btn.textContent = originalText; }, 3000);
    });
  }