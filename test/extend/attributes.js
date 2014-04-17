describe('jBone Attributes', function() {

    it('addClass(class)', function() {
        var a = jBone('<div>');

        a.addClass('test');

        expect(a.attr('class')).be.eql('test');
    });

    it('addClass(class1 class2)', function() {
        var a = jBone('<div>');

        a.addClass('class1  class2  ');

        expect(a.attr('class')).be.eql('class1 class2');
    });

});
