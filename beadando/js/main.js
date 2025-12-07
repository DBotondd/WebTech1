// jQuery animations and simple theme
$(function(){
  // Animate nav on load
  $('.main-nav a').each(function(i,el){
    $(el).css({opacity:0, position:'relative', top:-8})
         .delay(100*i).animate({opacity:1, top:0}, 400);
  });
  // Marquee color pulse
  $('.marquee').each(function(){
    let on = false;
    setInterval(()=>{
      on = !on;
      $(this).animate({opacity: on ? 1 : 0.7}, 500);
    }, 1200);
  });
});