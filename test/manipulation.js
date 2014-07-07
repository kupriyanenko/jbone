describe('jBone Manipulation', function() {

    it('Initialized', function() {
        expect(jBone().html).to.be.a("function");
        expect(jBone().append).to.be.a("function");
        expect(jBone().appendTo).to.be.a("function");
        expect(jBone().empty).to.be.a("function");
        expect(jBone().remove).to.be.a("function");
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

    it('html(undefined)', function() {
        var a = jBone('<div>test</div>');

        a.html(undefined);
        expect(a.html()).eql('test');
    });

    it('html()', function() {
        var a = jBone('<div>test <span>text</span></div>');

        expect(a.html()).eql('test <span>text</span>');
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
        var a = jBone('<div><p></p><p></p></div>');
        a.find('p').append(document.createElement('span'));

        expect(a.find('p, span')).to.have.length(4);
    });

    it('append(DocumentFragment)', function() {
        var a = jBone('<div></div>');
        var b = document.createDocumentFragment();

        b.appendChild(document.createElement('span'));
        b.appendChild(document.createElement('span'));

        a.append(b);

        expect(a.find('span')).to.have.length(2);
    });

    it('append(NodeList)', function() {
        var a = jBone('<div>'),
            f = document.createDocumentFragment();

        f.appendChild(document.createElement('span'));
        f.appendChild(document.createElement('span'));

        a.append(f.childNodes);

        expect(a.find('span')).to.have.length(2);
    });

    it('append(text)', function() {
        var a = jBone('<div>');

        a.append('text');
        a.append(1);

        expect(a.html()).to.eql('text1');
    });

    it('append(text) for multiple elements should add text each nodes', function() {
        var a = jBone('<div><span></span><span></span></div>');

        a.find('span').append('text');

        expect(a[0].textContent).to.eql('texttext');
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

    it('remove() should remoe all event listners', function() {
        var a = jBone('<a>'),
            i = 0;
        a.on('click', function() {
            i++;
        });

        a.remove();

        a.trigger('click');

        expect(i).to.be.eql(0);
    });
});
