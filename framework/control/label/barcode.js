class Barcode extends ElementBase {
    constructor(element) {
        super(element);

        this.element = element;
        this.doc = this.element.doc;
        this.container = this.element.dom;

        this.create();
    }

    toJson() {
        console.log("this is barcode.class");
    }

    // ------------------------------------------------------------------------
    create() {
        let _this = this;
        let divRoot = _this.doc.createElement("DIV");

        _this.container.appendChild(divRoot);
        divRoot.innerHTML = this.element.value;

    }
}