describe('jBone Attributes', function() {

  it('Set attributes in init function', function() {
    var a = jBone('<a>', {
        class: 'test'
    });

    expect(a[0].getAttribute('class')).to.be('test');
  });

  it('#.attr for get attribute', function() {
    var a = jBone('<a>', {
        title: 'link'
    });

    expect(a.attr('title')).to.be('link');
  });

  it('#.attr for set attributes', function() {
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

});
