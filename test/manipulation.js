describe('jBone Manipulation', function() {

    it('Initialized', function() {
        expect(jBone().html).to.be.a("function");
        expect(jBone().append).to.be.a("function");
        expect(jBone().appendTo).to.be.a("function");
        expect(jBone().empty).to.be.a("function");
        expect(jBone().remove).to.be.a("function");
        expect(jBone().replaceWith).to.be.a("function");
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

    it('append(html)', function() {
        var a = jBone('<div><span></span></div>').append('<span></span><p></p>');

        expect(a.find('span')).to.have.length(2);
    });

    it('append(jBone)', function() {
        var a = jBone('<div><p></p></div>').append(jBone('<p>'));

        expect(a.find('p')).to.have.length(2);
    });

    it('append(HTMLElement)', function() {
        var a = jBone('<div><p></p></div>');
        a.find('p').append(document.createElement('span'));

        expect(a.find('p, span')).to.have.length(2);
    });

    it('append(DocumentFragment)', function() {
        var a = jBone('<div><p></p></div>');
        var b = document.createDocumentFragment();

        b.appendChild(document.createElement('span'));
        b.appendChild(document.createElement('span'));

        a.append(b);

        expect(a.find('span')).to.have.length(2);
    });

    it('append(text)', function() {
        var a = jBone('<div>');

        a.append('text');
        a.append(1);

        expect(a.html()).to.eql('text1');
    });

    it('appendTo()', function() {
        var a = jBone('<div></div>');
        var b = jBone('<input><input>').appendTo(a);

        expect(a.find('input')).to.have.length(2);
        expect(b).to.have.length(2);
    });

    it('empty()', function() {
        var a = jBone('<div><input><input><div><input></div></div>');

        expect(a[0].childNodes).to.have.length(3);

        a.empty();
        expect(a[0].childNodes).to.have.length(0);
    });

    it('empty(multi elements)', function() {
        var a = jBone('<div><input><input></div><span><a></a></span>');

        expect(a).to.have.length(2);
        expect(a[0].childNodes).to.have.length(2);
        expect(a[1].childNodes).to.have.length(1);

        a.empty();
        expect(a).to.have.length(2);
        expect(a[0].childNodes).to.have.length(0);
        expect(a[1].childNodes).to.have.length(0);
    });

    it('remove() is working', function() {
        var wrap = jBone('<div><input></div>');

        expect(wrap.find('input')).to.have.length(1);

        wrap.find('input').remove();
        expect(wrap.find('input')).to.have.length(0);
    });

    it('remove() with node is not inserted in DOM', function() {
        var a = jBone('<a>');
        a.remove();

        expect(a).to.be.a(jBone);
    });

    it('replaceWith(HTMLElement)', function() {
        var parent      = jBone('<div><a>');
        var replacement = document.createElement("b");
        parent.find('a').replaceWith(replacement);
        expect(parent[0].childNodes).to.have.length(1);
        expect(parent[0].childNodes[0]).to.be(replacement);
    });

    it('replaceWith(jBone)', function() {
        var parent      = jBone('<div><a>');
        var replacement = jBone("<b>");
        parent.find('a').replaceWith(replacement);
        expect(parent[0].childNodes).to.have.length(1);
        expect(parent[0].childNodes[0]).to.be(replacement[0]);
    });

});
