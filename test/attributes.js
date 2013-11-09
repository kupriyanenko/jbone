describe('jBone Attributes', function() {

    it('Initialized', function() {
        expect(jBone().attr).to.be.ok();
        expect(jBone().val).to.be.ok();
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

    it('val() getting value', function() {
        var a = jBone('<input>');
        a[0].value = 'test';

        expect(a.val()).to.be('test');
    });

    it('val(value) setting value', function() {
        var a = jBone('<input>').val('test');

        expect(a.val()).to.be('test');
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

});
