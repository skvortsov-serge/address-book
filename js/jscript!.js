$(document).ready(function() {

    var currentGroupContacts = [],
        allContacts = [],
        searchVal = '';

    function info(nam, eml, phn, group) {

        $('.info-email').text(eml);
        $('.info-phone').text(phn);
        $('.details').text(nam);
        $('.info-group').text(group);

    };

    $('.create').click(function() {
        var fullNameVal = $('.full-name').val();
        var emailVal = $('.email').val();
        var phoneVal = $('.phone').val();
        var groupVal = $('.group').val();

        if (fullNameVal != '') {
            $('.list').prepend('<li data-name="' + fullNameVal + '" data-email="' + emailVal + '" data-phone="' + phoneVal + '" data-group="' + groupVal + '">' + fullNameVal + '</li>');
            $('.form-add')[0].reset();
        } else {
            alert('write down name');
        }

        $('.form-add').removeClass('is-showing');

    });

    $('.contacts .list').on('click', 'li', function() {
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
        var pos = $('.btn-add').offset().left;
        $('.pointer').css({ 'left': pos });
    }

    function positionEdit() {
        var pos = $('.btn-edit').offset().left - $('.btn-edit').width();
        $('.pointer').css({ 'left': pos });
    }

    $('.dropdown-menu li').click(function(event) {
        if ($(event.target).is('.dropdown-menu li:first-child')) {
            var btnGroup = $(this).text();
            $('#dLabel').text(btnGroup);

            currentGroupContacts = $('.list li');

            search(searchVal, currentGroupContacts);
        } else {
            var btnGroup = $(this).text();
            $('#dLabel').text(btnGroup);
            
            currentGroupContacts = $('.list li').filter(function() {
                return $(this).data('group') == btnGroup;
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
        console.log(key, list.length);
        
        allContacts.hide();

        $(list).each(function() {
            if ($(this).text().toLowerCase().search(key) == -1) {
                $(this).hide();
                console.log('hide');
            } else {
                $(this).show();
                console.log('show');
            }
        });

    };

    // initialization
    allContacts = currentGroupContacts = $('.list li');

});
