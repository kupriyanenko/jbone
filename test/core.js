describe('jBone Core', function() {

    before(function() {
        var html = '<div><span><a href="#"><span><input type="text" /></span></a></span></div>';
        $('#app').html(html);
    });

    after(function() {
        $('#app').empty();
    });

    it('jBone initialized', function() {
        expect(jBone).to.be.an('function');
        expect(jBone()).to.be.an(jBone);
    });

    it('jBone imported to $', function() {
        expect(window.jBone).to.be.ok();
        expect(window.$).to.be.ok();
        expect($()).to.be.an(jBone);
    });

    it('jBone element have right id', function() {
        var a = jBone({}), b = jBone('<a>'), c = jBone(window);

        a.on('click', function() {});
        b.on('click', function() {});
        c.on('click', function() {});

        expect(a[0].jid).to.be.a('number');
        expect(jBone.getData(b).jid).to.be.a('number');
        expect(a[0].jid).not.to.eql(b[0].jid);
        expect(window.jid).to.be(undefined);
        expect(c[0].jid).to.be(undefined);
        expect(jBone.getData(c).jid).to.be.ok();
    });

    it('jBone() with invalid data', function() {
        expect(jBone('text')).to.have.length(0);
        expect(jBone(null)).to.have.length(0);
        expect(jBone(undefined)).to.have.length(0);
        expect(jBone('#')).to.have.length(0);
    });

    it('jBone(html) create new single DOM element', function() {
        var a = jBone('<a>');

        expect(a[0]).to.be.an(HTMLElement);
        expect(a).to.have.length(1);
    });

    it('jBone(html) create each DOM elements', function() {
        var a = jBone('<p></p><p></p><p></p>');

        expect(a[1].tagName.toLowerCase()).to.be('p');
        expect(a).to.have.length(3);
    });

    it('jBone(html) create nested DOM element', function() {
        var a = jBone('<p><span></span><span></span></p>');

        expect(a[0].childNodes).to.have.length(2);
    });

    it('jBone(selector) create single element from selector', function() {
        var a = jBone('#app div');

        expect(a).to.have.length(1);
        expect(a[0]).to.be.an(HTMLElement);
    });

    it('jBone(selector) create some elements from selector', function() {
        var a = jBone('#app span');

        expect(a).to.have.length(2);
        expect(a[1]).to.be.an(HTMLElement);
    });

    it('jBone(selector, context)', function() {
        expect(jBone('input', 'a span')).to.have.length(1);
        expect(jBone('input', 'ul')).to.have.length(0);

        expect(jBone('input', jBone('#app'))).to.have.length(1);
        expect(jBone('input', jBone('ul'))).to.have.length(0);
    });

    it('jBone(element) create some elements from DOMElement', function() {
        var a = jBone(document.createElement('div'));

        expect(a[0].tagName.toLowerCase()).to.be('div');
    });

    it('jBone(jBone) do not create new jBone element', function() {
        var a = jBone('<input><input>');
        var b = jBone(a);

        expect(b[0]).to.be.an(HTMLElement);
        expect(b).have.length(2);
        expect(jBone.getData(a).jid).to.be(jBone.getData(b).jid);
    });

    it('jBone(NodeList)', function() {
        var fragment = document.createDocumentFragment(),
            a0 = document.createElement('a'),
            a1 = document.createElement('a');
        fragment.appendChild(a0);
        fragment.appendChild(a1);

        var $a = $(fragment.childNodes);

        expect($a).have.length(2);
    });

});
