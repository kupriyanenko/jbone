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

        expect(jBone.contains(a, c)).ok();
        expect(jBone.contains(a.find('span'), c)).eql(a.find('span')[0]);
        expect(jBone.contains(a, b)).not.ok();
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

});