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

});
