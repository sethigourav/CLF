let targetIconName = '';

$(document).ready(function () {
    $('#vegetables').hide();
    $('.switch input[type="checkbox"]').click(function () {
        if ($(this).prop("checked") == true) {
            $('.optionSelLeft').removeClass('active');
            $('.optionSelRight').addClass('active');
            $('#vegetables').show();
            $('#fruits').hide();
        } else if ($(this).prop("checked") == false) {
            $('.optionSelRight').removeClass('active');
            $('#vegetables').hide();
            $('#fruits').show();
            $('.optionSelLeft').addClass('active');

        }
    });

    //  To show hover Icons

    $('.icon-dim').hover(function () {

        $(this).find('.text-name').addClass('show');
    }, function () {
        $(this).find('.text-name').removeClass('show');
    });


    //  To Show and Hide PurposeBox and TypeBox on click of commodity icons

    $('.icon-dim').click(function (e) {
        e.stopPropagation();
        // Decide Position before open 
        decideTypeBoxPosition(e);

        // finding target Icon name by data attribute and storing globally
        targetIconName = $(this).find('img')[0].dataset.iconName;
        $(this).siblings('.combolist').find('.typebox').addClass(targetIconName);

        if ($(this).siblings('.combolist').find('.typebox').css('display') == 'none') {
            $('.typebox').hide();
            $('.purposebox').hide();
            $(".carousel-control-next").css('z-index', '1');
            $('.combobox.typebox ul li').removeClass('addedcaret');
            $(this).siblings('.combolist').find('.typebox').slideDown();
            $(this).addClass("result_hover");
            $(".carousel-inner").css('overflow', 'unset');
        } else {
            $(this).siblings('.combolist').find('.typebox').slideUp();
        }
    });

    $(".combolist").click(function (e) {
        e.stopPropagation();
    });

    $("body").click(
        function (e) {
            $('.purposebox').hide();
            $('.typebox').hide();
            $(".carousel-control-next").css('z-index', '1');
            $(".carousel-inner").css('overflow', 'hidden');

        });

    /***************************************/


    $('.rightcaret input').on('change', function () {
        var classval = $(this).val();
        var siblingsdiv = $(this).parents('.combobox').siblings('.purpose-box-area');

        $('.purpose-box-area .purposebox').hide();
        if ($(this).is(":checked")) {
            if (siblingsdiv.find('.purposebox').hasClass(classval)) {
                siblingsdiv.find('.purposebox.' + classval).show();
            } else {
                var purposebox = '<div class="combobox purposebox text-center ' + classval + '" ><p class="combo-heading">Purpose </p>   <ul class="subCustomScrollbar"> <li>  <label><input type="checkbox" name="puree" value="Puree" /> Puree</label> </li> <li>  <label><input type="checkbox" name="juice" value="Juice" /> Juice</label> </li> <li>  <label><input type="checkbox" name="canned" value="Canned" /> Canned</label> </li> <li>  <label><input type="checkbox" name="frogen" value="Frozen" /> Frozen</label> </li> <li>  <label><input type="checkbox" name="puree" value="Puree" /> Puree</label> </li> <li>  <label><input type="checkbox" name="juice" value="Juice" /> Juice</label> </li><li>  <label>     <input type="checkbox" name="canned" value="Canned" /> Canned</label> </li> <li>  <label><input type="checkbox" name="frogen" value="Frozen" /> Frozen</label> </li>   </ul>   <div class="text-center action-btn"> <button type="button" class="combox-btn ">Done</button>   </div></div>';
                $(siblingsdiv).append(purposebox);

                // Runtime adding custom scroll bar on puprose box
                $(".purposebox .subCustomScrollbar").mCustomScrollbar();
            }
        }
    });

    /**
     * @description Descide Position of type box by indentify the position where user click
     * @param {event} event
     */
    function decideTypeBoxPosition(event) {
        const COMBOLIST = $(event.currentTarget).siblings('.combolist');
        const TYPEBOX = COMBOLIST.find('.typebox');
        const yAxis = (event.clientY + (event.currentTarget.clientHeight - event.offsetY) + TYPEBOX.outerHeight()) > window.innerHeight;
        const xAxis = (200 + event.clientX + (event.currentTarget.clientWidth - event.offsetX) + TYPEBOX.outerWidth()) > window.innerWidth;
        if (yAxis && xAxis) {
            COMBOLIST.addClass('bottomlist last');
            TYPEBOX.find('span.top-left-triangle').addClass('triangle-bottom-color bottom-triangle-position')
        } else if (yAxis) {
            COMBOLIST.removeClass('last');
            COMBOLIST.addClass('bottomlist');
            TYPEBOX.find('span.top-left-triangle').addClass('triangle-bottom-color bottom-triangle-position left-bottom-position')
        }
        else if (xAxis) {
            COMBOLIST.addClass('last');
            COMBOLIST.removeClass('bottomlist');
            TYPEBOX.find('span.top-left-triangle').removeClass('triangle-bottom-color bottom-triangle-position left-bottom-position' )
        } else {
            COMBOLIST.removeClass('bottomlist last');
            TYPEBOX.find('span.top-left-triangle').removeClass('triangle-bottom-color bottom-triangle-position left-bottom-position')
        }
    }

});

// Controlling selection of items from purposebox and typebox
(function () {
    document.querySelector('.productSlider.product-border').addEventListener('change', function (event) {

        // Toggle the checkbox class on selecton of radio button
        $(event.target).toggleClass('checkbox');

        // toggle selected Icon Name from target element
        $(event.target).toggleClass(targetIconName);

        // getting parent element of target element
        let parnetLI = $(event.target).parents('li');

        // toggle selected Icon Name to its parent li
        parnetLI.toggleClass(targetIconName);

        // add or remove addedcarret class on selecton of radio button
        if (parnetLI.hasClass('rightcaret')) { // do not toggle class if element not have right caret class
            parnetLI.parent().find('li').removeClass('addedcaret');
            if ($(event.target).is(":checked")) {
                parnetLI.addClass('addedcaret');
            }
        }
    })
})();