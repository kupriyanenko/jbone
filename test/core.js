describe('jBone Core', function() {

    before(function() {
        var html = '<div><span><a href="#"><span></span></a></span></div>';
        document.getElementById('app').innerHTML = html;
    });

    after(function() {
        document.getElementById('app').innerHTML = '';
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

        expect(a[0].jid).to.be.a('number');
        expect(jBone._data(b).jid).to.be.a('number');
        expect(a[0].jid).not.to.eql(b[0].jid);
        expect(window.jid).to.be(undefined);
        expect(c[0].jid).to.be(undefined);
        expect(jBone._data(c).jid).to.be.ok();
    });

    it('jBone create new single DOM element', function() {
        var a = jBone('<a>');

        expect(a[0]).to.be.an(HTMLElement);
        expect(a).to.have.length(1);
    });

    it('jBone create each DOM elements', function() {
        var a = jBone('<p></p><p></p><p></p>');

        expect(a[1].tagName.toLocaleLowerCase()).to.be('p');
        expect(a).to.have.length(3);
    });

    it('jBone create nested DOM element', function() {
        var a = jBone('<p><span></span><span></span></p>');

        expect(a[0].childNodes).to.have.length(2);
    });

    it('jBone create single element from selector', function() {
        var a = jBone('#app div');

        expect(a).to.have.length(1);
        expect(a[0]).to.be.an(HTMLElement);
    });

    it('jBone create some elements from selector', function() {
        var a = jBone('#app span');

        expect(a).to.have.length(2);
        expect(a[1]).to.be.an(HTMLElement);
    });

});
