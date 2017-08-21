'use strict';
;(function () {
    $(document).ready(function () {

        var isIos = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);      // побеждаем шрифты в ios
        if (isIos) {
            $(".moneyCounter__money").css("letter-spacing", "-1px");
            $(".fineInput__input_submit").css("letter-spacing", "-1.5px");
        }

        var modalOn = false;
        $("body").on("mouseleave", function (e) {
            if (e.offsetY - $(window).scrollTop() < 0 && !modalOn) {
                modalOn = true;
                $(".modalWindow").css("padding-right", "15px").fadeIn("slow");
                $("body").addClass("modalOn");
                window.scrollTo(0, 0);
            }
        });
        $(".close").on("click", function () {
            $(".modalWindow").css("padding-right", "0").fadeOut("fast");
            $("body").removeClass("modalOn");
            modalOn = false;
        })
    });
})();