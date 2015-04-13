describe('jBone Unilities', function() {

    it('Initialized', function() {
        expect(jBone.merge).to.be.a('function');
        expect(jBone.contains).to.be.a('function');
        expect(jBone.extend).to.be.a('function');
    });

    it('merge(first, second)', function() {
        var a = [1], b = [2, {}];

        jBone.merge(a, b);

        expect(a.length).eql(3);
        expect(a[2]).eql(b[1]);
    });

    it('contains(container, contained)', function() {
        var a = jBone('<div><span><input /></span></div>'),
            b = jBone('<span>'),
            c = a.find('input')[0];

        expect(jBone.contains(a[0], c)).ok();
        expect(jBone.contains(a[0], b[0])).not.ok();

        expect(jBone.contains(document.documentElement, document.body)).ok();
        expect(jBone.contains(document.body, document.documentElement)).not.ok();
    });

    it('extend(target, element)', function() {
        var a = {
            x: 1
        }, b = {
            y: 2,
            z: {}
        }, c, d;

        a = jBone.extend(a, b);

        expect(a).eql(a);
        expect(a).have.property('y').and.property('y').eql(b.y);
        expect(a.z).eql(b.z);

        c = jBone.extend({}, a, b);

        expect(c).have.property('z').and.property('z').eql(a.z);

        d = jBone.extend(c, undefined);

        expect(d).eql(c);
    });

    it('unique(array) should return array with the duplicates removed', function() {
        // with numbers
        expect(jBone.unique([1, 2, 1])).eql([1, 2]);

        // with strings
        expect(jBone.unique(['a', 'a', 'b'])).eql(['a', 'b']);

        // with DOM elemets
        var a = $('div')[0];
        var b = $('span')[0];

        expect(jBone.unique([a, b, a])).eql([a, b]);
    });

});