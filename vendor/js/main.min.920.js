odometerOptions = {auto: !1};
var Counter = function () {
    var counts, updating_counts, updating_counters, counters_initialized;
    return init = function () {
        counts = {
            session_count: {
                element: "#session_count",
                previous: page_info.total_sessions - 30,
                current: page_info.total_sessions
            },
            therapist_count: {
                element: "#therapist_count",
                previous: page_info.total_therapists,
                current: page_info.total_therapists
            },
            member_count: {
                element: "#member_count",
                previous: page_info.total_members,
                current: page_info.total_members
            }
        }, on_scroll(), $(document).on("scroll", on_scroll)
    }, update_counts = function () {
        var data = {"session_count": 34929161, "therapist_count": 3262, "member_count": 450265, "status": "success"}
        updating_counts = !0, in_view() ? $.get(data).success(function (data) {
            var result = JSON.parse(data);
            counts.session_count.current = result.session_count, counts.therapist_count.current = result.therapist_count, counts.member_count.current = result.member_count
        }).always(function () {
            in_view() && setTimeout(update_counts, 2e4)
        }) : updating_counts = !1
    }, update_counters = function () {
        if (updating_counters = !0, in_view()) {
            for (count in counts) {
                var difference = counts[count].current - counts[count].previous;
                if (difference) {
                    var divisor = get_random(15, 30),
                        randomized_difference = Math.ceil(Math.random() * difference / divisor);
                    counts[count].previous += randomized_difference, $(counts[count].element).text(counts[count].previous)
                }
            }
            var timeout_time = get_random(500, 2e3);
            setTimeout(update_counters, timeout_time)
        } else updating_counters = !1
    }, get_random = function (min, max) {
        return min + Math.random() * (max - min)
    }, on_scroll = function () {
        var counters_in_view = in_view();
        counters_in_view && !counters_initialized && ($(".counter-number").each(function () {
            new Odometer({el: $(this)[0], value: $(this).text(), theme: "train-station"}).render()
        }), counters_initialized = !0), counters_in_view && !updating_counts && update_counts(), counters_in_view && !updating_counters && update_counters()
    }, in_view = function () {
        if (!(document.hidden || document.msHidden || document.webkitHidden || document.mozHidden)) {
            var viewport_height = $(window).height(), counter_offset = $("section.numbers").offset().top,
                counter_height = $("section.numbers").height(), document_position = $(window).scrollTop(),
                viewport_end = document_position + viewport_height;
            return document_position <= counter_offset + counter_height && viewport_end >= counter_offset
        }
    }, {init: init}
}();


$(document).ready(function () {
    $(".down-arrow-img").click(function () {
        $("html, body").animate({scrollTop: $(".numbers").offset().top - 60}, 500)
    }), AOS.init({duration: 1200});
    var visibleHeader = function () {
       if($(window).scrollTop() > 50) {
           $("header").addClass("scroll-header")
           $(".header-cta").removeClass("hide")
           // $("header .right").addClass("hide")
       } else{
           $("header").removeClass("scroll-header")
           $(".header-cta").addClass("hide")
           // $("header .right").removeClass("hide")
       }
        // $(window).scrollTop() > 50 ? ($("header").addClass("scroll-header"), $(".hidden-sm.brand img"), $(".header-cta").removeClass("hide")) : ($("header").removeClass("scroll-header"), $(".hidden-sm.brand img"), $(".header-cta").addClass("hide"))
    };

    // $(window).on("scroll", visibleHeader), visibleHeader(), $(".testimonial-slider").slick({
    //     dots: !0,
    //     infinite: !1,
    //     adaptiveHeight: !0,
    //     arrows: !1,
    //     swipe: !0,
    //     swipeToSlide: !0,
    //     autoplay: !0,
    //     autoplaySpeed: 7e3
    // }), Counter.init()

    function createSlick() {

        $(".testimonial-slider").not('.slick-initialized').slick({
            dots: !0,
            infinite: !1,
            adaptiveHeight: !0,
            arrows: !1,
            swipe: !0,
            swipeToSlide: !0,
            autoplay: !0,
            autoplaySpeed: 7e3
        }), Counter.init()

    }

    $(".testimonial-slider").not('.slick-initialized').slick({
        dots: !0,
        infinite: !1,
        adaptiveHeight: !0,
        arrows: !1,
        swipe: !0,
        swipeToSlide: !0,
        autoplay: !0,
        autoplaySpeed: 7e3
    }), Counter.init()

    $(window).on("scroll", visibleHeader), visibleHeader(), createSlick()

});


//
//# sourceMappingURL=main.map