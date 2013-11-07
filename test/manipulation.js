describe('jBone Manipulation', function() {

    it('iInitialized', function() {
        expect(jBone().remove).to.be.ok();
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
