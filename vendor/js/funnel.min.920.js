/*
$(document).ready(function () {
    console.log("ready");

    function NextstripeResponseHandler(status, response) {
        if (response.error) {
            switch ($("#next-errors").html(response.error.message).removeClass("hidden").css("display", "block"), $("#next_13_payment_modal").length && $("#next_13_payment_modal").modal("show"), response.error.code) {
                case"invalid_number":
                case"incorrect_number":
                    $("#next-card_number-label").addClass("error"), $("#next-card_number").addClass("error");
                    break;
                case"invalid_expiry_month":
                case"invalid_expiry_year":
                    $("#next-card_expired-label").addClass("error"), $("#next-card_expired_month").addClass("error"), $("#next-card_expired_year").addClass("error");
                    break;
                case"invalid_cvc":
                    $("#next-card_cvc-label").addClass("error")
            }
            $("body").css("cursor", "auto"), $(".btn").removeClass("loading"), $(".btn").removeAttr("disabled")
        } else {
            var form$ = $("#next-payment");
            form$.append('<input type="hidden" name="token" value="' + response.id + '">'), form$.get(0).submit()
        }
    }

    function setStateLanguages(elem) {
        var s = $("#state"), l = $("#preferred_language"), state_id = $(s).val();
        if (s.length && l.length && void 0 !== state_id && page_info.state_languages.hasOwnProperty(state_id) && page_info.state_languages[state_id].length > 1) {
            var option;
            option = $("<option></option>").attr("value", "0").text("Select preferred language"), $(l).empty().append(option);
            for (lang_info in page_info.state_languages[state_id]) option = $("<option></option>").attr("value", page_info.state_languages[state_id][lang_info].lang_id).text(page_info.state_languages[state_id][lang_info].lang_name), $(l).append(option)
        }
    }

    function setIntlLanguages(elem) {
        if ("1" != $("#country").val()) {
            var l = $("#preferred_language");
            if (l.length) {
                var option;
                option = $("<option></option>").attr("value", "0").text("Select preferred language"), $(l).empty().append(option);
                for (lang_name in page_info.intl_languages) option = $("<option></option>").attr("value", page_info.intl_languages[lang_name].lang_id).text(page_info.intl_languages[lang_name].lang_name), $(l).append(option)
            }
        }
    }

    switch (page_info.template) {
        case"home":
            var count = 0,
                words = ['<span style="color: #9cd9e0">living.</span>', '<span style="color: #e499b8">goals.</span>', '<span style="color: #ba76b1">stories.</span>', '<span style="color: #a8d384">family.</span>', '<span style="color: #80c6dd">relationships.</span>', '<span style="color: #e5807f">adventures.</span>', '<span style="color: #5479bc">focus.</span>', '<span style="color: #d6c44b">travel.</span>', '<span style="color: #43aa7c">days.</span>', '<span style="color: #e65a5e">moods.</span>', '<span style="color: #5faa41">help.</span>'],
                textRotator = setInterval(function () {
                    $(".text-rotator").fadeOut(function () {
                        $(".text-rotator").html(words[count]), $(".text-rotator").fadeIn()
                    }), ++count == words.length - 1 && clearInterval(textRotator)
                }, 1500);
            $("#testimonial-slider").slick({
                dots: !0,
                infinite: !1,
                adaptiveHeight: !0,
                arrows: !1,
                swipe: !1,
                swipeToSlide: !1,
                autoplay: !0,
                autoplaySpeed: 3e3
            }), $("#counselor-bar img").tooltip();
            break;
        case"start_slider":
            $("#step-4").length > 0 && $(window).width() > 767 && ($("#start_slider #body-container").css("min-height", "900px"), $("footer").css({
                position: "absolute",
                bottom: "-50px"
            }))
    }
    $("#confirm-start-email").on("blur", function () {
        $.trim($("#start-email").val()) != $.trim($("#confirm-start-email").val()) && $(".signup .alert").text("Emails don't match").removeClass("hidden").show()
    }), $(window).bind("pageshow", function (event) {
        event.originalEvent.persisted && window.location.reload()
    }), $(window).unload(function () {
        $(window).unbind("unload")
    });
    var answeredOrder = 0, started = ($("body").attr("is_mobile"), !1);
    $(".mobilemenu").hover(function () {
        $("nav ul").toggle("fast")
    });
    var availableTags = ["alabama", "alaska", "arizona", "arkansas", "california", "colorado", "connecticut", "delaware", "florida", "georgia", "hawaii", "idaho", "illinois", "indiana", "iowa", "kansas", "kentucky", "louisiana", "maine", "montana", "nebraska", "nevada", "new hampshire", "new jersey", "new mexico", "new york", "north carolina", "north dakota", "ohio", "oklahoma", "oregon", "maryland", "massachusetts", "michigan", "minnesota", "mississippi", "missouri", "pennsylvania", "rhode island", "south carolina", "south dakota", "tennessee", "texas", "utah", "vermont", "virginia", "washington", "west virginia", "wisconsin", "wyoming", "district of columbia"];
    $(".autocomplete").length && $(".autocomplete").autocomplete({source: availableTags}), $("#testimonial-slider").click(function (e) {
        mixpanel && mixpanel.track("Viewed Success Video")
    }), $(".more_desc").click(function () {
        $("#full_description").toggleClass("hidden"), $("#trimmed_description").toggleClass("hidden")
    }), $(".is_finance").click(function (e) {
        var financial_status = $(this).closest("label").text().toLowerCase().trim();
        "good" == financial_status && (mixpanel && mixpanel.track("Selected Good Financial"), "undefined" != typeof dataLayer && dataLayer.push({event: "indicate_rich"})), "poor" != financial_status && "undefined" != typeof dataLayer && dataLayer.push({event: "indicate_not_poor"})
    }), $(".is_previous_therapy").click(function (e) {
        "yes" == $(this).closest("label").text().toLowerCase().trim() && (mixpanel && mixpanel.track("Selected Previous therapy"), "undefined" != typeof dataLayer && dataLayer.push({event: "selected_previous_therapy"}))
    });
    var quizes = {iqtype: "_"};
    if ($(".PHQ")[0] && (quizes.iqtype += "PHQ_"), $(".PWB")[0] && (quizes.iqtype += "PWB_"), $(".SHS")[0] && (quizes.iqtype += "SHS_"), mixpanel && (page_info.features.parent_child_account && !page_info.teen_trigger_intakeQuizShown || mixpanel.track("intakeQuizShown", {
            iqtype: quizes.iqtype,
            quizzes_loaded: $("#quizzes_loaded").attr("data-quizzes-loaded")
        })), $("#start-testimonial-slider").length && $("#start-testimonial-slider").slick({
            dots: !0,
            infinite: !1,
            adaptiveHeight: !0,
            arrows: !1,
            swipe: !1,
            swipeToSlide: !1,
            autoplay: !0,
            autoplaySpeed: 3e3
        }), $("#start-testimonial-image-slider").length && $("#start-testimonial-image-slider").slick({
            infinite: !1,
            adaptiveHeight: !0,
            arrows: !1,
            swipe: !1,
            swipeToSlide: !1,
            autoplay: !1,
            autoplaySpeed: 3e3
        }), $("#state").length) var stateInput = $("#state"); else var stateInput = $("#pin_q_state");
    var not_religious, is_spiritual_question = !1;
    if ($("#start-question-slider").on("init", function (slick) {
            window.fs = slick;
            var redirect_modal_shown = !1;
            $(".redirect-1").on("click", function (e) {
                if (!redirect_modal_shown) {
                    var self = this;
                    if ($(this).attr("data-redirect-modal") != undefined) if ("refer_to_faithful" == $(this).attr("data-redirect-modal")) var modal_to_show = "#refer_to_faithful",
                        mixpanel_event = "redirect_faithful_modal_shown", mixpanel_link_query = "#redirect-to-faithful",
                        mixpanel_link_event = "redirected_to_faithful",
                        mixpanel_link_property_value = "faithful_counseling",
                        dont_redirect_link = "#dont-redirect-faithful",
                        dont_redirect_event = "did_not_redirect_faithful",
                        dont_redirect_answer = "bh_counseling"; else "refer_to_pride" == $(this).attr("data-redirect-modal") ? (modal_to_show = "#refer_to_pride", mixpanel_event = "redirect_pride_modal_shown", mixpanel_link_query = "#redirect-to-pride", mixpanel_link_event = "redirected_to_pride", mixpanel_link_property_value = "pride_counseling", dont_redirect_link = "#dont-redirect-pride", dont_redirect_event = "did_not_redirect_pride", dont_redirect_answer = "bh_counseling") : "refer_to_teen" == $(this).attr("data-redirect-modal") ? (modal_to_show = "#refer_to_teen", mixpanel_event = "redirect_parent_to_teen_modal_shown", mixpanel_link_query = "#redirect-parent-to-teen", mixpanel_link_event = "redirected_parent_to_teen", mixpanel_link_property_value = "teen_counseling", dont_redirect_link = "#dont-redirect-parent-to-teen", dont_redirect_event = "did_not_redirect_parent_to_teen", dont_redirect_answer = "bh_counseling") : (modal_to_show = "#refer_to_regain", mixpanel_event = "redirect_modal_shown", mixpanel_link_query = "#redirect-to-site", mixpanel_link_event = "redirected_to_other_site", mixpanel_link_property_value = "couple_counseling", dont_redirect_link = "#dont-redirect", dont_redirect_event = "did_not_redirect", dont_redirect_answer = "individual_counseling"); else modal_to_show = "#refer_to_regain", mixpanel_event = "redirect_modal_shown", mixpanel_link_query = "#redirect-to-site", mixpanel_link_event = "redirected_to_other_site", mixpanel_link_property_value = "couple_counseling", dont_redirect_link = "#dont-redirect", dont_redirect_event = "did_not_redirect", dont_redirect_answer = "individual_counseling";
                    $(modal_to_show).length ? (e.preventDefault(), $(modal_to_show).modal("show"), mixpanel && mixpanel.track(mixpanel_event), mixpanel && mixpanel.track_links(mixpanel_link_query, mixpanel_link_event, {redirect_answer: mixpanel_link_property_value}), $(dont_redirect_link).on("click", function () {
                        redirect_modal_shown = !0, $("input", self).prop("checked", !0), mixpanel && mixpanel.track(dont_redirect_event, {redirect_answer: dont_redirect_answer}), $(modal_to_show).modal("hide"), $("#start-question-slider").slick("slickNext")
                    })) : mixpanel && mixpanel.track("did_not_redirect_because_no_available_counselors")
                }
            }), $(".slider-next").click(function (event) {
                if ($(event.target).is("a") && mixpanel) {
                    var answer = {}, question = $(event.target).attr("name");
                    answer.answer_id = 0, void 0 !== question && (answer.question_id = question.replace("quiz_answers", "qa")), mixpanel.track("intakeQ" + answeredOrder, answer), answeredOrder++
                }
                if ($("#q_type_error").length && $("#q_type_error").remove(), "pin_q_age" == this.id && (!isInt(+$("input#pin_q_age").val()) || +$("input#pin_q_age").val() < 13 || +$("input#pin_q_age").val() > 99)) $('<div id="q_type_error" class="alert alert-danger">Please enter an integer between 13 and 99</div>').insertBefore(".slider"); else if ("pin_q_state" == this.id) {
                    var state = $.inArray($.trim($("input#pin_q_state").val().toLowerCase()), availableTags);
                    state < 0 ? $('<div class="alert alert-danger">Please enter a valid state</div>').insertBefore(".slider") : ($("input#pin_q_state").val(state + 1), event.preventDefault(), $("#start-question-slider").slick("slickNext"))
                } else if ($(this).hasClass("country")) {
                    if (event.preventDefault(), 0 != $("#country").val()) {
                        if (1 != $("#country").val()) {
                            var languageElement = $("#preferred_language");
                            stateInput.removeAttr("required"), $("#start-question-slider").slick("slickAdd", stateInput.closest("div.slick-slide")), undefined != page_info.ask_language && "ask" == page_info.ask_language || languageElement.length && ($("#preferred_language").removeAttr("required"), $("#start-question-slider").slick("slickAdd", $("#preferred_language").closest("div.slick-slide")))
                        }
                        $("#start-question-slider").slick("slickNext")
                    }
                } else event.preventDefault(), $("#start-question-slider").slick("slickNext");
                $("#start-testimonial-image-slider").length && $("#start-testimonial-image-slider").slick("slickNext")
            }), $(".slider-next-select .quiz-slider").bind("mouseup touchend", function () {
                $(this).attr("mid") == $(this).val() && $(this).parent().trigger("change")
            }), $(".slider-next-select").on("change", function (event) {
                if (set_cookie("tc_exit_enabled", 0), 0 == started && (mixpanel && mixpanel.track("Started Questionaire"), "undefined" != typeof dataLayer && dataLayer.push({event: "started_questionaire"}), started = !0), $(event.target).closest(".form-group").find(".questionnaire-content-label").html().indexOf("spiritual or religious") > -1 && !page_info.bipolar && (not_religious = $.trim($(event.target).parent().text()).toLowerCase(), "test" == page_info.refer_to_faithful && (is_spiritual_question = !0), "no" === not_religious && $(".fc-redirect").removeAttr("required")), mixpanel && $(event.target).closest(".form-group").find(".questionnaire-content-label").html().indexOf("gender") > -1) {
                    var gender = $.trim($(event.target).parent().text()).toLowerCase();
                    mixpanel.register({gender: gender})
                }
                if (mixpanel && $(event.target).closest(".form-group").find(".questionnaire-content-label").html().indexOf("therapy before") > -1) {
                    var therapy_before = $.trim($(event.target).parent().text()).toLowerCase();
                    mixpanel.register({therapy_before: therapy_before}), set_cookie("therapy_before", $(this).text().trim(), 2592e3)
                }
                if (mixpanel && $(event.target).closest(".form-group").find(".questionnaire-content-label").html().indexOf("suicid") > -1) {
                    var rejection_answer = $(event.target).parent().context.value;
                    mixpanel.track("dilavni", {dilavnivar: rejection_answer})
                }
                var answer = {};
                if ($(this).is("select")) answer.question_id = $(this).attr("name"), answer.answer_id = $(this).val(); else if ($(this).children("input")) {
                    var question = $(this).children("input").attr("name");
                    answer.answer_id = $(this).children().attr("value"), answer.question_id = question.replace("quiz_answers", "qa")
                }
                if (mixpanel && mixpanel.track("intakeQ" + answeredOrder, answer), answeredOrder++, 1 == $.cookie("back_button_in_funnel") && history.pushState({num: answeredOrder}, null, "#" + answeredOrder), event.preventDefault(), "country" == $(this).attr("id")) 0 == $("#country").val() ? $(this).parents(".questionnaire-content").find(".slider-next").addClass("disabled") : ($(this).parents(".questionnaire-content").find(".slider-next").removeClass("disabled"), 1 == $("#country").val() ? (stateInput.removeClass("hide"), stateInput.attr("required", "required")) : (stateInput.attr("required", !1), $.isEmptyObject(page_info.intl_languages) && ($("#preferred_language").attr("required", !1), $("#start-question-slider").slick("slickAdd", $("#preferred_language").closest("div.slick-slide"))))); else if ("state" == $(this).attr("id")) 0 == $("#state").val() ? $(this).parents(".questionnaire-content").find(".slider-next").addClass("disabled") : ($(this).parents(".questionnaire-content").find(".slider-next").removeClass("disabled"), page_info.ask_language && "ask" == page_info.ask_language && (page_info.state_languages && page_info.state_languages[$("#state").val()] && page_info.state_languages[$("#state").val()].length > 1 ? ($("#preferred_language").removeClass("hide"), $("#preferred_language").attr("required", "required")) : ($("#preferred_language").attr("required", !1), $("#start-question-slider").slick("slickAdd", $("#preferred_language").closest("div.slick-slide")))), $("#start-question-slider").slick("slickNext")); else if ("age_select" == $(this).attr("id")) {
                    var selected_age = parseInt(answer.answer_id);
                    if (selected_age < 18 && "betterhelp" == page_info.product_code_name) return $("#redirect_to_teen").modal("show"), void(mixpanel && (mixpanel.track("redirect_teen_to_teen_modal_shown"), mixpanel.track_links("#redirect-teen-to-teen", "redirected_teen_to_teen", {redirect_answer: "teen_counseling"})));
                    $("#start-question-slider").slick("slickNext")
                } else $("#start-question-slider").slick("slickNext");
                $("#start-testimonial-image-slider").length && $("#start-testimonial-image-slider").slick("slickNext"), $(this).blur()
            }), $(".slider-lazy-load").css({visibility: "visible"})
        }), $("#start-question-slider").on("beforeChange", function (event, slick, currentSlide, nextSlide) {
            is_spiritual_question && "no" == not_religious && (is_spiritual_question = !1, $("#start-question-slider").slick("slickRemove", nextSlide))
        }), $("#start-question-slider").on("afterChange", function (event, slick, currentSlide) {
            for (var radioElements = $(slick.$slides[currentSlide]).find($(".answer")), slide = $("[data-slick-index=" + currentSlide + "]"), i = 0; i < radioElements.length; i++) radioElements[i].blur(), radioElements[i].checked = !1;
            slide.attr("data-step") != undefined && mixpanel && ("signup" == slide.attr("data-step") ? mixpanel.track("Viewed Signup page") : mixpanel.track("Viewed " + slide.attr("data-step") + " Template")), $("input, textarea, select").prop("disabled", !1), mixpanel && slide.find(".questionnaire-content-label") && slide.find(".questionnaire-content-label").html() && slide.find(".questionnaire-content-label").html().indexOf("suicid") > -1 && mixpanel.track("viewed_suicidal_question")
        }), $("#start-question-slider").slick({
            infinite: !1,
            adaptiveHeight: !0,
            arrows: !1,
            swipeToSlide: !1,
            draggable: !1,
            swipe: !1,
            touchMove: !1,
            speed: 400,
            accessibility: !1,
            mobileFirst: !0
        }), $("#modal-landing").length && $("#modal-landing").modal({
            show: !0,
            backdrop: !0
        }), $("#questionnaire-show-last").click(function (e) {
            $("#starts1").addClass("go-away"), $("#starts2").removeClass("hide")
        }), $("#feedback").length && $("#start-password").password_strength(), $("form").submit(function (e) {
            $(".alert").not(".draft, .note, .counselor, .client, #next-errors").hide(), $("body").css("cursor", "wait"), $(".error").removeClass("error"), $(".has-error").removeClass("has-error"), $(".btn", this).attr("disabled", "disabled"), $(".btn", this).addClass("loading")
        }), $("input").keypress(function (e) {
            $(".alert").not(".draft, .note, .counselor, .client").hide(), $(".has-error").removeClass("has-error")
        }), $("textarea").keypress(function (e) {
            $(".alert").not(".draft, .note, .counselor, .client").hide()
        }), $("#next-payment").submit(function (e) {
            return Stripe.createToken({
                number: $("#next-card_number").val(),
                exp_month: $("#next-card_expired_month").val(),
                exp_year: $("#next-card_expired_year").val()
            }, NextstripeResponseHandler), !1
        }), $("#show_expertise").click(function () {
            $("#expertise1").addClass("hide"), $("#expertise2").removeClass("hide")
        }), $(".mobile-funnel-header").length && $("#show_expertise").click(function () {
            $("#expertise1-title").addClass("hide"), $("#expertise2-title").removeClass("hide"), $(".mobile-funnel-header").addClass("mf-match-2"), $(".mobile-funnel-header").removeClass("mf-match")
        }), $(".dropdown-mobile-toggle").click(function () {
            $(".mobile-funnel-header .fa").hasClass("fa-bars") ? $(".mobile-funnel-header .fa").removeClass("fa-bars").addClass("fa-times") : $(".mobile-funnel-header .fa").removeClass("fa-times").addClass("fa-bars")
        }), $("#start-password").length && $("#start-password").password_strength(), $("#modal-landing").length && $("#modal-landing").modal({
            show: !0,
            backdrop: !0
        }), "start-go2" == page_info.template && ($("#testimonial-slider").slick({
            dots: !0,
            infinite: !1,
            adaptiveHeight: !0,
            arrows: !1,
            swipe: !1,
            swipeToSlide: !1,
            autoplay: !0,
            autoplaySpeed: 3e3
        }), $("#counselor-bar img").tooltip()), $(document).on("keydown", function (e) {
            var disabledKeys;
            return !($("#start-question-slider").length && ($(e.originalEvent.target).closest(".slider-funnel").length ? (disabledKeys = new Array(9, 13, 33, 34), "start-email" == $(e.originalEvent.target).attr("id") && 9 == e.which && $("#confirm-start-email").prop("disabled", !1).focus()) : disabledKeys = new Array(9, 13, 33, 34, 37, 38, 39, 40), $.inArray(e.which, disabledKeys) > -1)) || (e.preventDefault(), !1)
        }), $("#state").on("change", setStateLanguages), $("#country").on("change", setIntlLanguages), (page_info.features.friendly_funnel || "control" != page_info.presignup_experiments.friendly_funnel) && !page_info.sleep && !page_info.eating_disorder && !page_info.bipolar) {
        var ff_questions = {};
        switch (page_info.product_code_name) {
            case"pridecounseling":
                ff_questions = {
                    "How do you identify?": "Hi, I'll be walking you through the process of finding the best therapist for you! We'll start off with some basic questions.",
                    "What is your orientation (select all that apply)?": "Individuals in the LGBTQ community are 3 times more likely to suffer from mental health conditions.",
                    "How old are you?": "<b>Did you know?</b><br/>Almost a fifth of older adults in the United States have experienced depression. (Geriatric Mental Health Foundation, 2008)",
                    "How would you rate your current physical health?": "Studies show that exercise can help with depression as effectively as antidepressant medication. (<i>Psychosomatic Medicine</i>, 2007)",
                    "How would you rate your current sleeping habits?": "Many adults who have generalized anxiety disorder also suffer from sleep problems.",
                    "Do you prefer to be matched with a counselor in the LGBT community?": "While all of our counselors specialize in the LGBTQ community, we also have counselors that are part of the community themselves.",
                    "Are you currently experiencing overwhelming sadness, grief, or depression?": "Psychotherapy can serve as an effective treatment for clinical depression.",
                    "Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual.": "The next few questions will help your counselor understand how you've been feeling and where to begin treatment.",
                    "Are you currently experiencing anxiety, panic attacks or have any phobias?": "Some symptoms of panic attacks include a racing heart, dizziness, or chest pains.",
                    "Do you consider yourself to be spiritual or religious?": "Counselors on the Pride Counseling platform have diverse backgrounds. You'll be able to request a Christian counselor if needed.",
                    "Are you currently taking any medication?": "Rest assured - any information provided in this questionnaire will stay private between you and your counselor."
                };
                break;
            case"betterhelp":
                ff_questions = {
                    "What is your gender?": "Hi, I'll be walking you through the process of finding the best therapist for you! We'll start off with some basic questions.",
                    "How old are you?": "<b>Did you know?</b><br/>Almost a fifth of older adults in the United States have experienced depression. (Geriatric Mental Health Foundation, 2008)",
                    "How would you rate your current physical health?": "Studies show that exercise can help with depression as effectively as antidepressant medication. (<i>Psychosomatic Medicine</i>, 2007)",
                    "How would you rate your current sleeping habits?": "Many adults who have generalized anxiety disorder also suffer from sleep problems.",
                    "Are you currently experiencing overwhelming sadness, grief, or depression?": "Psychotherapy can serve as an effective treatment for clinical depression.",
                    "Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual.": "The next few questions will help your counselor understand how you've been feeling and where to begin treatment.",
                    "Are you currently experiencing anxiety, panic attacks or have any phobias?": "Some symptoms of panic attacks include a racing heart, dizziness, or chest pains.",
                    "Do you consider yourself to be spiritual or religious?": "Counselors on the BetterHelp platform have diverse backgrounds. You'll be able to request a Christian counselor if needed.",
                    "Are you currently taking any medication?": "Rest assured - any information provided in this questionnaire will stay private between you and your counselor."
                }
        }
        var index = 0;
        for (var ff_question in ff_questions) $(".questionnaire-content").each(function (i, el) {
            if ($(el).find(".questionnaire-content-label").text().indexOf(ff_question) > -1) {
                var container = $("<div class='ff-question-container' />").append("<div class='ff-question-image'><img src='//" + page_info.cdn_host_assets + "/icons/" + page_info.product_code_name + "/ff-therapist-female.jpg" + page_info.assets_app_version + "' /></div>").appendTo($(el));
                return 0 == index && $(container).appendTo($("[data-slick-index=0] .form-group")), $("<div class='ff-question'/>").html(ff_questions[ff_question]).appendTo($(container)), !1
            }
        }), index++
    }
    $("#modal-exit").length && $("#modal-exit").popOnExit(), $("#affiliate-modal-exit").length && $("#affiliate-modal-exit").popOnExit()
});
//# sourceMappingURL=funnel.map*/
