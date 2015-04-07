describe('jBone Attributes', function() {

    it('Initialized', function() {
        expect(jBone.fn.attr).to.be.a('function');
        expect(jBone.fn.val).to.be.a('function');
        expect(jBone.fn.css).to.be.a('function');
        expect(jBone.fn.data).to.be.a('function');
    });

    it('Set attributes in init function', function() {
        var a = jBone('<a>', {
            class: 'test'
        });

        expect(a[0].getAttribute('class')).to.be('test');
    });

    it('attr(name) getting attributes', function() {
        var a = jBone('<a>', {
            title: 'link'
        });

        expect(a.attr('title')).to.be('link');
    });

    it('attr(name, value) seting attributes', function() {
        var a = jBone('<a>');
        a.attr('class', 'test');
        a.attr({
            href: '/',
            target: '_blank'
        });

        expect(a.attr('class')).to.be('test');
        expect(a.attr('href')).to.be('/');
        expect(a.attr('target')).to.be('_blank');
    });

    it('removeAttr(key) should remove attribute', function() {
        var $el = jBone('<div>');
        $el.attr('name', 'value');
        $el.removeAttr('name');
        expect($el.attr('name')).to.be(null);
    });

    it('removeAttr(key) should works correct if attr is not exist', function() {
        var $el = jBone('<div>');
        $el.removeAttr('name');
        expect($el.attr('name')).to.be(null);
    });

    it('val() getting value', function() {
        var a = jBone('<input>');
        a[0].value = 'test';

        expect(a.val()).to.be('test');
    });

    it('val(value) setting value', function() {
        var a = jBone('<input>').val('test');

        expect(a.val()).to.be('test');
    });

    it('val(value) setting integer value', function() {
        var a = jBone('<input>').val(123);

        expect(a.val()).to.be.eql(123);
    });

    it('css(key, value) setting value', function() {
        var a = jBone('<div>').css('height', '100px');

        expect(a[0].style).to.have.property('height', '100px');
    });

    it('css({}) setting value', function() {
        var a = jBone('<div>').css({
            width: '10px',
            height: '100px'
        });

        expect(a[0].style).to.have.property('height', '100px');
        expect(a[0].style).to.have.property('width', '10px');
    });

    it('css(key) getting value', function() {
        var a = jBone('<div>').css('display', 'none').appendTo('#app');

        expect(a.css('display')).to.be('none');
    });

    it('data(key, value)', function() {
        var a = jBone('<div>');

        a.data('name', 'John');

        expect(a[0].dataset.name).be.eql('John');
    });

    it('data(key, value)', function() {
        var a = jBone('<div>').data('name', 'John');

        expect(a[0].dataset.name).be.eql('John');
    });

    it('data(key)', function() {
        var a = jBone('<div>'),
            fn = function() {},
            obj = { a: 1 };

        a.data('name', 'John');
        a.data('fn', fn);
        a.data('obj', obj);
        a.data('boolean', true);
        a.data({
            first: 1,
            second: fn,
            third: obj
        });

        expect(a.data('name')).be.eql('John');
        expect(a.data('fn')).be.eql(fn);
        expect(a.data('obj')).be.eql(obj);
        expect(a.data('boolean')).be.eql(true);
        expect(a.data('first')).be.eql(1);
        expect(a.data('second')).be.eql(fn);
        expect(a.data('third')).be.eql(obj);
    });

    it('removeData(key)', function() {
        var a = jBone('<div>');

        a.data('name', 'John');
        a.data('fn', function() {});
        expect(a.data('name')).be.eql('John');

        a
            .removeData('name')
            .removeData('fn');
        expect(a.data('name')).be.eql(undefined);
        expect(a.data('fn')).be.eql(undefined);
    });

    it('removeData()', function() {
        var a = jBone('<div>');

        a.data('name', 'John');
        a.data('fn', function() {});
        expect(a.data('name')).be.eql('John');

        a.removeData();
        expect(a.data('name')).be.eql(undefined);
        expect(a.data('fn')).be.eql(undefined);
    });

    it('removeData(key) and removeData() witn not defined keys', function() {
        var a = jBone('<div>');
        a.removeData('name');
        a.removeData();
    });

    it('addClass(name) should add new class', function() {
        var a = jBone('<div>');
        a.addClass('name');

        expect(a[0].getAttribute('class')).be.eql('name');
    });

    it('addClass() should handle empty class', function() {
        var a = jBone('<div>');
        a.addClass('');

        expect(a[0].getAttribute('class')).be.eql(null);
    });

    it('addClass() should handle invalid class', function() {
        var a = jBone('<div>');
        a.addClass();

        expect(a[0].getAttribute('class')).be.eql(null);
    });

    it('addClass(name) shouldn\'t add new class if class already exist', function() {
        var a = jBone('<div class="name">');
        a.addClass('name');

        expect(a[0].getAttribute('class')).be.eql('name');
    });

    it('addClass(first second) should add multiple classes', function() {
        var a = jBone('<div>');
        a.addClass('first second');

        expect(a[0].getAttribute('class')).be.eql('first second');
    });

    it('removeClass(name) should remove existing class', function() {
        var a = jBone('<div class="name">');
        a.removeClass('name');

        expect(a[0].getAttribute('class')).be.eql('');
    });

    it('removeClass(name) should handle empty class', function() {
        var a = jBone('<div class="name">');
        a.removeClass('');

        expect(a[0].getAttribute('class')).be.eql('name');
    });

    it('removeClass(name) should handle invalid class', function() {
        var a = jBone('<div class="name">');
        a.removeClass();

        expect(a[0].getAttribute('class')).be.eql('name');
    });

    it('removeClass(first second) should remove multiple classes', function() {
        var a = jBone('<div class="first second">');
        a.removeClass('first second');

        expect(a[0].getAttribute('class')).be.eql('');
    });

    it('removeClass(name) should work correct with not existing class', function() {
        var a = jBone('<div class="name">');
        a.removeClass('not-name');

        expect(a[0].getAttribute('class')).be.eql('name');

        var b = jBone('<div>');
        b.removeClass('not-name');

        expect(b[0].getAttribute('class')).be.eql(null);
    });

    it('toggleClass(name) should add new class if class not exist', function() {
        var a = jBone('<div>');
        a.toggleClass('name');

        expect(a[0].getAttribute('class')).be.eql('name');
    });

    it('toggleClass(name) should handle empty class', function() {
        var a = jBone('<div>');
        a.toggleClass('');

        expect(a[0].getAttribute('class')).be.eql(null);
    });

    it('toggleClass(name) should handle invalid class', function() {
        var a = jBone('<div>');
        a.toggleClass();

        expect(a[0].getAttribute('class')).be.eql(null);
    });

    it('toggleClass(name) should remove class if class is exist', function() {
        var a = jBone('<div class="name">');
        a.toggleClass('name');

        expect(a[0].getAttribute('class')).be.eql('');
    });

    it('toggleClass(name, force) should remove class if token is false', function() {
        var a = jBone('<div class="name">');
        a.toggleClass('name', false);

        expect(a[0].getAttribute('class')).be.eql('');

        a = jBone('<div>');
        a.toggleClass('name', false);

        expect(a[0].getAttribute('class')).be.eql(null);
    });

    it('toggleClass(name, force) should add class if token is true', function() {
        var a = jBone('<div class="name">');
        a.toggleClass('name', true);

        expect(a[0].getAttribute('class')).be.eql('name');

        a = jBone('<div>');
        a.toggleClass('name', true);

        expect(a[0].getAttribute('class')).be.eql('name');
    });

    it('hasClass(name) should check if class exist', function() {
        var a = jBone('<div class="name">');
        var b = jBone('<div>');

        expect(a.hasClass('name')).be.eql(true);
        expect(a.hasClass('not-name')).be.eql(false);
        expect(b.hasClass('name')).be.eql(false);
    });

    it('hasClass(name) should handle empty class', function() {
        var a = jBone('<div class="name">');
        var b = jBone('<div>');

        expect(a.hasClass('')).be.eql(false);
    });

    it('hasClass(name) should handle invalid class', function() {
        var a = jBone('<div class="name">');
        var b = jBone('<div>');

        expect(a.hasClass()).be.eql(false);
    });
});
