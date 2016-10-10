$(document).ready(function() {

    var currentGroupContacts = [],
        AllContacts = [],
        searchVal = '';

    function info(nam, eml, phn, group) {

        $('.info-email').text(eml);
        $('.info-phone').text(phn);
        $('.details').text(nam);
        $('.info-group').text(group);

    };

    $('.create').on('click', function() {
        var fullNameVal = $('.full-name').val();
        var emailVal = $('.email').val();
        var phoneVal = $('.phone').val();
        var groupVal = $('.group').val();

        if (fullNameVal != '') {
            $('.list').prepend('<li data-name="' + fullNameVal + '" data-email="' + emailVal + '" data-phone="' + phoneVal + '" data-group="' + groupVal + '">' + fullNameVal + ' <i class="fa fa-exchange transfer data-toggle="tooltip" data-placement="top" title="Change Group""></i></li>');
            $('.form-add')[0].reset();
        } else {
            alert('write down name');
        }

        $('.form-add').removeClass('is-showing');

    });

    $('.contacts .list').on('click', 'li', function(event) {
        info($(this).data('name'), $(this).data('email'), $(this).data('phone'), $(this).data('group'));

        $('.btns .btn-remove, .btn-edit').removeClass('remove');
        $('.contacts ul li').removeClass('active');
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
        }

    });

    $('.btns .btn-remove').on('click', function() {

        var confirmation = confirm("Are You Sure?");
        if (confirmation == true) {
            $(this).addClass('remove');
            alert('This contact has been successfully deleted');
            $('.active').remove();
        }
    });

    $('.btn-edit').click(function() {
        $('.form-edit').toggleClass('is-showing').css({ 'animation': 'addPopup 0.3s ease-in-out forwards' });
        var valueName = $('.active').data('name');
        var valueEmail = $('.active').data('email');
        var valuePhone = $('.active').data('phone');
        var valueGroup = $('.active').data('group');

        $('.full-name-edit').attr({ value: valueName });
        $('.email-edit').attr({ value: valueEmail });
        $('.phone-edit').attr({ value: valuePhone });
        $('.group-edit').val(valueGroup);

        $('.form-add').removeClass('is-showing');
        $('.form-add')[0].reset();

        positionEdit();

    });

    $('.edit-contact').click(function() {

        var editName = $('.full-name-edit').val();
        var editEmail = $('.email-edit').val();
        var editPhone = $('.phone-edit').val();
        var editGroup = $('.group-edit').val();

        info(editName, editEmail, editPhone, editGroup);

        $('.active').data('name', editName);
        $('.active').data('email', editEmail);
        $('.active').data('phone', editPhone);
        $('.active').data('group', editGroup);

        $('.active').text(editName);
        $('.form-edit').removeClass('is-showing');
        $('.form-edit')[0].reset();
    });

    $('.btn-add').click(function() {
        $('.form-add').toggleClass('is-showing').css({ 'animation': 'addPopup 0.3s ease-in-out forwards' });
        $('.form-edit').removeClass('is-showing');
        $('.form-edit')[0].reset();
        positionAdd();
    });

    $('.close-btn, .edit-contact').click(function() {
        $('.form-add, .form-edit').removeClass('is-showing');
        $('.form-add, .form-edit')[0].reset();

    });

    function positionAdd() {
        var pos = $('.btn-add').position().left + 15;
        $('.pointer').css({ 'left': pos });
    }

    function positionEdit() {
        var pos = $('.btn-edit').position().left - $('.btn-edit').width() + 23;
        $('.pointer').css({ 'left': pos });
    }

    $('.dropdown-menu').on('click', 'li', function(event) {
        if ($(event.target).is('.dropdown-menu li:first-child')) {

            var btnGroup = $(this).text();
            $('#dLabel').text(btnGroup);

            currentGroupContacts = $('.list li');

            search(searchVal, currentGroupContacts);

        } else {
            btnGroup = $(this).text();
            $('#dLabel').text(btnGroup);

            $('.list li').each(function() {
                var groupText = $(this).data('group');
                // console.log(btnGroup + 'Text of button');
                // console.log(groupText + ' group of li');
                // console.log(groupText == btnGroup);
                if (groupText == btnGroup) {
                    $(this).show();
                } else {
                    $(this).hide();
                }

            });

            currentGroupContacts = $('.list li').filter(function() {
                return $(this).data('group') == btnGroup
            });

            search(searchVal, currentGroupContacts);
        }

    });

    // -----------------------------------------------------------------------
    // Search Functionality
    // -----------------------------------------------------------------------

    // Event bindings
    $('.search').keyup(function(e) {
        searchVal = $(this).val();
        search(searchVal, currentGroupContacts);
    });

    // helper functions

    function search(key, list) {

        AllContacts.hide();

        $(list).each(function() {
            if ($(this).text().toLowerCase().search(key) == -1) {
                $(this).hide();
            } else {
                $(this).show();
            }
        })
    };

    // initialization
    AllContacts = currentGroupContacts = $('.list li');



    // --------------------------------------------
    // transfering contacts into another group
    // --------------------------------------------

    var iPosLeft = ' ';
    var iPosTop = ' ';
    var contact = '';
    var contactTransfer = '';

    $('.list').on('mouseenter mouseleave', 'li', function(event) {
        $(this).find('i').toggle(event.type === 'mouseenter');
    });

    $('.list').on('click', 'li i', function() {
        contact = $(this).closest('li').data('group');
        contactTransfer = $(this).closest('li');
        iPosLeft = $(this).offset().left + 10;
        iPosTop = $(this).offset().top - 128;

        $('.transfer-group').toggle().css({ 'left': iPosLeft, 'top': iPosTop });

        $(' .transfer-group .popover-content ul li').each(function() {
            if ($(this).text() == contact) {
                $(this).css({ 'color': 'rgba(51,51,51,0.2)', 'pointer-events': 'none' });
            } else {
                $(this).css({ 'color': 'rgba(51,51,51,1)', 'pointer-events': 'auto' });
                $(this).click(function() {
                    var groupTransfer = $(this).text();
                    $(contactTransfer).data('group', groupTransfer);
                    $('.info-group').text(groupTransfer);
                    $('.popover').hide();
                });
            }
        });



    });

    // -------------------------------
    // NEW GROUP
    // -------------------------------


    $('.new-group-btn').click(function() {
        iPosLeft = $(this).position().left + 105;
        iPosTop = $(this).position.top;
        $('.new-group').toggle().css({ 'left': iPosLeft, 'top': iPosTop });
    });

    var groupName = ' ';

    $('.transf-btn').on('click', function() {
        groupName = $('.group-name').val();
        $('.group').append('<option>' + groupName + '</option>');
        $('.dropdown-menu').append('<li>' + groupName + '</li>');
        $('.popover-content ul').append('<li>' + groupName + '</li>');
        $('.new-group').hide();
        $('.group-name').val('');
    });

});
