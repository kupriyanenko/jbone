describe('jBone Manipulation', function() {

    it('Initialized', function() {
        expect(jBone().remove).to.be.ok();
    });

    it('html(jBone)', function() {
        var a = jBone('<div>').html(jBone('<span></span><p></p>'));

        expect(a[0].childNodes).to.have.length(2);
    });

    it('html(html)', function() {
        var a = jBone('<div>').html('<span></span><p></p>');

        expect(a[0].childNodes).to.have.length(2);
    });

    it('html(Node)', function() {
        var a = jBone('<div>').html(document.createElement('span'));

        expect(a[0].childNodes).to.have.length(1);
    });

    it('html(DocumentFragment)', function() {
        var a = jBone('<div>');
        var b = document.createDocumentFragment();

        b.appendChild(document.createElement('span'));
        b.appendChild(document.createElement('span'));

        a.html(b);

        expect(a[0].childNodes).to.have.length(2);
    });

    it('remove() is working', function() {
        var wrap = jBone('<div><input></div>');

        expect(wrap.find('input')).to.have.length(1);

        wrap.find('input').remove();
        expect(wrap.find('input')).to.have.length(0);
    });

    it('remove() node not inserted in DOM', function() {
        var a = jBone('<a>');
        a.remove();

        expect(a).to.be.a(jBone);
    });
});
