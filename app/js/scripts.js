'use strict';
;(function(){
    $(document).ready(function () {
        var triggered = false;
        $("body").on("mouseleave", function (e) {
            if (e.offsetY - $(window).scrollTop() < 0 && !triggered) {
                triggered = true;
                $(".modalWindow").fadeIn("slow");
                $("body").addClass("modalOn");
                window.scrollTo(0, 0);
            }
        });
        $(".close").on("click", function () {
            $(".modalWindow").fadeOut("fast");
            $("body").removeClass("modalOn");
            triggered = false;
        })
    });
})();