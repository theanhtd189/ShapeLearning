const PARAMETER_NAME = "paramater";
const RESULT_NAME = "result";
const AREA_TYPE_NAME = "area";
const VOLUME_TYPE_NAME = "volume";
const PERIMETER_TYPE_NAME = "perimeter";
var checkInput = false;

var GetInput = function (name,type=PARAMETER_NAME) {
  var find = $("input[e-name='"+type+"'][name='"+name+"']");
  if(find.length==1){
    return find;
  }
  else
  if(find.length>1){
    return find.eq(1);
  }
  else{
    return null;
  }
}


var SetPerimeterResult = function (value){
  var result = GetInput(PERIMETER_TYPE_NAME,RESULT_NAME);
  if(result!=null){
    result.val(value);
  }
  else{
    console.log("NULL OUTPUT")
  }
}

var SetAreaResult = function (value){
  var result = GetInput(AREA_TYPE_NAME,RESULT_NAME);
  if(result!=null){
    result.val(value);
  }
  else{
    console.log("NULL OUTPUT")
  }
}

var SetVolumeResult = function (){
  
}

var Check_IS_Input_Empty = function (){
  var checkEmpty = false;
    var listInput = $("input[e-name='paramater']");
    for(var i=0; i<listInput.length; i++){
      var e = listInput[i];
      if(e.value.trim()==""){
        alert("Bạn chưa nhập "+e.getAttribute('e-display'));
        checkEmpty = true;
        break;
      } 
    }
    return checkEmpty;
}


class Shape {
  constructor() {
    this.ShapeList = [];
    this.ShapeName = "Shape Origin";
    this.Volume = false;
    this.setBtn();
  }

  getShapeList() {
    return this.ShapeList;
  }

  setList(name, value = "", result=0) {

    if(name == AREA_TYPE_NAME){
      value = "Diện tích";
    }
    else
    if(name == VOLUME_TYPE_NAME){
      value = "Thể tích";
    }
    else
    if(name == PERIMETER_TYPE_NAME){
      value = "Chu vi";
    }

    var _type = PARAMETER_NAME;
    if(name == AREA_TYPE_NAME || name == VOLUME_TYPE_NAME || name == PERIMETER_TYPE_NAME){
      _type = RESULT_NAME
    }
    else
    if(result!=0){
      _type = RESULT_NAME;
    }
    this.getShapeList().push([name, value, _type]);
  }

  setBtn() {
    var _div = $(".ShapeBtn");
    if (_div.children().length <= 0) {
      var btnArea = $("<a/>")
      .addClass("btn")
      .attr("e-type", AREA_TYPE_NAME)
      .attr("e-name",RESULT_NAME)
      .text("Tính diện tích");
      _div.append(btnArea);

      var btnPerimeter = $("<a/>")
      .addClass("btn")
      .attr("e-type", PERIMETER_TYPE_NAME)
      .attr("e-name",RESULT_NAME)
      .text("Tính chu vi");
      _div.append(btnPerimeter);

      if (this.Volume == true) {
        var btnVolume = $("<a/>")
        .addClass("btn")
        .attr("e-type", VOLUME_TYPE_NAME)
        .text("Tính thể tích");
        _div.append(btnVolume);
      }
    }
  }

  setUI() {
    var list  = this.ShapeList;
    console.log('set ui for ',this.ShapeName)
    console.log(list)

    var _name = $(".shape-name");
    _name.text("Cho " + this.ShapeName + " có:");

    var _div = $(".ShapeList");
    // console.log('Children ',_div.children(), ' length ',_div.children().length)
    if (_div.children().length <= 0) {
      for (var i = 0; i < list.length; i++) {
        var _this = list[i];
        var _p = $("<p/>").attr("name", _this[0]);
        var _span = $("<span/>")
          .attr("name", _this[0])
          .text(_this[1]);
        var _input = $("<input/>")
          .attr("type", "text")
          .attr('e-type', 'number')
          .attr('e-name',_this[2])
          .attr('e-display',_this[1])
          .attr("name", _this[0]);

        _p.append(_span);
        _p.append(_input);
        _div.append(_p);

      }
    }
  }


  btn_Volume_Click_Event(){

  }

  

}

class HinhVuong extends Shape {
  constructor() {
    super();
    this.ShapeName = "hình vuông";
    this.setList("a", "Chiều dài cạnh");
    this.setList(PERIMETER_TYPE_NAME);
    this.setList(AREA_TYPE_NAME);

  }
  click_Calc() {
    //diện tích
    $("a[e-type='"+AREA_TYPE_NAME+"']").click(function () {
      var is_empty = Check_IS_Input_Empty();
      if (!is_empty) {
        var canh_a = GetInput("a").val();
        var tinh = canh_a * canh_a;
        SetAreaResult(tinh);
      }
    });
    //Chu vi
    $("a[e-type='"+PERIMETER_TYPE_NAME+"']").click(function () {
      var is_empty = Check_IS_Input_Empty();
      if (!is_empty) {
        var canh_a = GetInput("a").val();
        var tinh = canh_a * 4;
        SetPerimeterResult(tinh);
      }
    });
  }
}

class HinhChuNhat extends Shape {
  constructor() {
    super();
    this.ShapeName = "hình chữ nhật";
    this.setList("a", "Chiều dài");
    this.setList("b", "Chiều rộng");
    this.setList(PERIMETER_TYPE_NAME);
    this.setList(AREA_TYPE_NAME);
  }
  click_Calc() {
    //diện tích
    $("a[e-type='"+AREA_TYPE_NAME+"']").click(function () {
      var is_empty = Check_IS_Input_Empty();
      if (!is_empty) {
        var canh_a = GetInput("a").val();
        var canh_b = GetInput("b").val();
        var tinh = canh_a * canh_b;
        SetAreaResult(tinh);
      }
    });
    //Chu vi
    $("a[e-type='"+PERIMETER_TYPE_NAME+"']").click(function () {
      var is_empty = Check_IS_Input_Empty();
      if (!is_empty) {
        
        var canh_a = GetInput("a").val();
        var canh_b = GetInput("b").val();
        var tinh = (canh_a + canh_b)*2;
        SetPerimeterResult(tinh);
      }
    });
  }
}

class HinhBinhHanh extends Shape {
  constructor() {
    super();
    this.ShapeName = "hình bình hành";
    this.setList("a", "Chiều dài (cạnh bên)");
    this.setList("b", "Chiều rộng (cạnh đáy)");
    this.setList("h", "Chiều cao");
    this.setList(PERIMETER_TYPE_NAME);
    this.setList(AREA_TYPE_NAME);
  }
  click_Calc() {
    //diện tích
    $("a[e-type='"+AREA_TYPE_NAME+"']").click(function () {
      var is_empty = Check_IS_Input_Empty();
      if (!is_empty) {
        var canh_a = GetInput("a").val();
        var canh_h = GetInput("h").val();
        var tinh = canh_a * canh_h;
        SetAreaResult(tinh);
      }
    });
    //Chu vi
    $("a[e-type='"+PERIMETER_TYPE_NAME+"']").click(function () {
      var is_empty = Check_IS_Input_Empty();
      if (!is_empty) {
        
        var canh_a = GetInput("a").val();
        var canh_b = GetInput("b").val();

        var tinh = (canh_a + canh_b)*2;
        SetPerimeterResult(tinh);
      }
    });
  }
}

class HinhThang extends Shape {
  constructor() {
    super();
    this.ShapeName = "hình chữ nhật";
    this.setList("a", "Chiều dài");
    this.setList("b", "Chiều rộng");
    this.setList("area", "Diện tích");
    this.setUI(this.ShapeList);
    console.log("init ",this.ShapeName)
  }
}

class HinhTron extends Shape {
  constructor() {
    super();
    this.ShapeName = "hình chữ nhật";
    this.setList("a", "Chiều dài");
    this.setList("b", "Chiều rộng");
    this.setList("area", "Diện tích");
    this.setUI(this.ShapeList);
    console.log("init ",this.ShapeName)
  }
}

class HinhTamGiac extends Shape {
  constructor() {
    super();
    this.ShapeName = "hình chữ nhật";
    this.setList("a", "Chiều dài");
    this.setList("b", "Chiều rộng");
    this.setList("area", "Diện tích");
    this.setUI(this.ShapeList);
    console.log("init ",this.ShapeName)
  }
}

class HinhThoi extends Shape {
  constructor() {
    super();
    this.ShapeName = "hình chữ nhật";
    this.setList("a", "Chiều dài");
    this.setList("b", "Chiều rộng");
    this.setList("area", "Diện tích");
    this.setUI(this.ShapeList);
    console.log("init ",this.ShapeName)
  }
}

class HinhHopChuNhat extends Shape {
  constructor() {
    super();
    this.ShapeName = "hình chữ nhật";
    this.setList("a", "Chiều dài");
    this.setList("b", "Chiều rộng");
    this.setList("area", "Diện tích");
    this.setUI(this.ShapeList);
    console.log("init ",this.ShapeName)
  }
}

class HinhLapPhuong extends Shape {
  constructor() {
    super();
    this.ShapeName = "hình chữ nhật";
    this.setList("a", "Chiều dài");
    this.setList("b", "Chiều rộng");
    this.setList("area", "Diện tích");
    this.setUI(this.ShapeList);
    console.log("init ",this.ShapeName)
  }
}

class HinhTru extends Shape {
  constructor() {
    super();
    this.ShapeName = "hình chữ nhật";
    this.setList("a", "Chiều dài");
    this.setList("b", "Chiều rộng");
    this.setList("area", "Diện tích");
    this.setUI(this.ShapeList);
    console.log("init ",this.ShapeName)
  }
}

class HinhCau extends Shape {
  constructor() {
    super();
    this.ShapeName = "hình chữ nhật";
    this.setList("a", "Chiều dài");
    this.setList("b", "Chiều rộng");
    this.setList("area", "Diện tích");
    this.setUI(this.ShapeList);
    console.log("init ",this.ShapeName)
  }
}

var getListShapeNameDB = function () {
  var list = 
  [
      ["Hình vuông",HinhVuong],
      ["Hình chữ nhật",HinhChuNhat],
      ["Hình bình hành",HinhBinhHanh],
      ["Hình thang",HinhThang],
      ["Hình tròn",HinhTron],
      ["Hình tam giác",HinhTamGiac],
      ["Hình thoi",HinhThoi],
      ["Hình hộp chữ nhật",HinhHopChuNhat],
      ["Hình lập phương",HinhLapPhuong],
      ["Hình trụ",HinhTru],
      ["Hình cầu",HinhCau],
  ];
  return list;
}


const database = [
  {
    Name: "Hình vuông",
    Url: "./assets/images/square.jpg",
    Defination: "Là hình tứ giác có 4 cạnh song song và bằng nhau, có 4 đỉnh và 4 góc vuông. ",
    Formula: [
      { Name: "Chu vi", Content: 'Lấy độ dài 1 cạnh rồi nhân với 4. <br> P = a x 4 <br> Kí hiệu: P là chu vi, a là độ dài 1 cạnh.' },
      { Name: "Diện tích", Content: 'Lấy độ dài 1 cạnh rồi nhân với chính nó. <br> S = a x a <br> Kí hiệu: S là diện tích, a là độ dài 1 cạnh.' }
    ],
    Color: "rgb(53 39 237)",
    Shape_ID: "square",
    Practice: new Shape,
  },
  {
    Name: "Hình chữ nhật",
    Url: "./assets/images/rectangle.jpg",
    Defination: "Là hình tứ giác có 2 cặp cạnh đối diện song song và bằng nhau, có 4 đỉnh và 4 góc vuông.",
    Color: "rgb(255 77 44)",
    Formula: [
      { Name: "Chu vi", Content: 'Lấy chiều dài cộng chiều rộng (cùng đơn vị đo) rồi nhân với 2. <br> P = (a + b) x 2 <br> Kí hiệu: P là chu vi, a là chiều dài, b là chiều rộng của hình chữ nhật.' },
      { Name: "Diện tích", Content: 'Lấy chiều dài nhân chiều rộng (cùng đơn vị đo). <br> S = a x b <br> Kí hiệu: S là diện tích, a là chiều dài, b là chiều rộng của hình chữ nhật.' }
    ],
    Shape_ID: "rectangle",
    Practice: new Shape,
  },
  {
    Name: "Hình bình hành",
    Url: "./assets/images/parallelogram.jpg",
    Defination: "Là hình tứ giác có 2 cặp cạnh đối diện, song song và bằng nhau. Có 4 đỉnh, có 4 góc (các góc đối bằng nhau). Hai đường chéo cắt nhau tại trung điểm của mỗi đường. ",

    Formula: [
      { Name: "Chu vi", Content: 'Lấy chiều dài cộng chiều rộng (cùng đơn vị đo) rồi nhân với 2. <br> P = (a + b) x 2 <br> Kí hiệu: P là chu vi, a là chiều dài, b là chiều rộng của hình bình hành.' },
      { Name: "Diện tích", Content: 'Lấy độ dài đáy nhân với chiều cao (cùng đơn vị đo). <br> S = a x h <br> Kí hiệu: S là diện tích, a là độ dài đáy, h là chiều cao của hình bình hành.' }
    ],

    Shape_ID: "parallelogram",
    Practice: new Shape,
  },
  {
    Name: "Hình thang",
    Url: "./assets/images/trapezoid.jpg",
    Defination: "Hình thang là hình tứ giác có hai cạnh đối diện song song và có hai đáy là đáy bé và đáy lớn, có 2 cạnh bên, có 4 đỉnh, 4 góc. <br> Các loại hình thang: hình thang thường, hình thang vuông (1 cạnh bên vuông góc với 2 đáy).",

    Formula: [
      { Name: "Chu vi", Content: 'Lấy tổng độ dài 4 cạnh. <br> P = a + b + c + d <br> Kí hiệu: P là chu vi, a là độ dài đáy lớn, b là độ dài đáy bé, c và d là hai cạnh bên của hình thang.' },
      { Name: "Diện tích", Content: 'Lấy tổng độ dài 2 đáy nhân với chiều cao (cùng đơn vị đó) rồi chia cho 2 <br> <img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/8b09636e5437562f6747600281211b9f990e9982" class="mwe-math-fallback-image-inline" aria-hidden="true" style="vertical-align: -1.838ex; width:16.49ex; height:5.676ex;" alt="{\displaystyle S={\frac {(a+b)\times h}{2}}}"> <br> Kí hiệu: S là diện tích, a và b là đáy lớn và đáy bé, h là chiều cao của hình thang.' }
    ],

    Shape_ID: "trapezoid",
    Practice: new Shape,
  },
  {
    Name: "Hình tròn",
    Url: "./assets/images/circle.jpg",
    Defination: "Hình tròn là tập hợp tất cả các điểm nằm bên trong và bên trên đường tròn hay nó là tập hợp các điểm cách tâm một khoảng nhỏ hơn hoặc bằng bán kính.",

    Formula: [
      { Name: "Chu vi", Content: 'Lấy đường kính nhân với số 3,14 (số π) hoặc lấy bán kính nhân 2 nhân 3,14 . <br> P = d x 3,14 hoặc P = r x 2 x 3,14 <br> Kí hiệu: P là chu vi, d là đường kính, r là bán kính của hình tròn.' },
      { Name: "Diện tích", Content: 'Lấy bán kính nhân với bán kính rồi nhân với số 3,14 (số π) <br> S = r x r x 3,14 <br> Kí hiệu: S là diện tích, r là bán kính là của hình tròn.' }
    ],

    Shape_ID: "circle",
    Practice: new Shape,
  },
  {
    Name: "Hình tam giác",
    Url: "./assets/images/triangle.jpg",
    Defination: "Là hình có 3 cạnh, 3 đỉnh và 3 góc. Các loại hình tam giác: tam giác thường, tam giác vuông, tam giác cân, tam giác đều. ",

    Formula: [
      { Name: "Chu vi", Content: 'Tổng độ dài 3 cạnh' }
      ,
      { Name: "Diện tích", Content: 'Lấy độ dài đáy nhân chiều cao rồi chia cho 2 <br> (S = a x h : 2) <br> Kí hiệu: S là diện tích, a là độ dài đáy, h là chiều cao của hình tam giác.' }
    ],

    Shape_ID: "triangle",
    Practice: new Shape,
  },
  {
    Name: "Hình thoi",
    Url: "./assets/images/rhombus.jpg",
    Defination: "Là hình tứ giác có bốn cạnh bằng nhau, có 4 đỉnh, 4 góc (các góc đối nhau bằng nhau). Hai đường chéo vuông góc với nhau và cắt nhau tại trung điểm của mỗi đường.",

    Formula: [
      { Name: "Chu vi", Content: 'Lấy độ dài một cạnh nhân với 4 (cùng đơn vị đo). <br> P = a x 4 <br> Kí hiệu: P là chu vi, a là độ dài 1 cạnh của hình thoi.' },
      { Name: "Diện tích", Content: 'Lấy tích độ dài của hai đường chéo chia cho 2 (cùng đơn vị đo). <br> S = m x n : 2 <br> Kí hiệu: S là diện tích, m, n là độ dài 2 đường chéo của hình thoi.' }
    ],

    Shape_ID: "rhombus",
    Practice: new Shape,
  },
  {
    Name: "Hình hộp chữ nhật",
    Url: "./assets/images/rectangular.jpg",
    Defination: "Là một hình không gian có 6 mặt (2 mặt đáy và 4 mặt bên), 8 đỉnh, 12 cạnh, có 3 kích thước là chiều dài, chiều rộng và chiều cao. Hai mặt của hình hộp chữ nhật không có cạnh chung gọi là hai mặt đối diện và có thể xem chúng là hai mặt đáy, các mặt còn lại được xem là các mặt bên.",

    Formula: [
      { Name: "Diện tích xung quanh", Content: 'Lấy chu vi đáy nhân với chiều cao (cùng đơn vị đo) <br> S = (a + b) x 2 x h <br> Kí hiệu: S là diện tích xung quanh, a là chiều dài, b là chiều rộng, h là chiều cao của hình hộp chữ nhật.' },
      { Name: "Diện tích toàn phần", Content: 'Lấy diện tích xung quanh cộng với diện tích 2 đáy <br> S = (a + b) x 2 x h + (a x b x 2) <br> Kí hiệu: S là diện tích toàn phần, a là chiều dài, b là chiều rộng, h là chiều cao của hình hộp chữ nhật.' },
      { Name: "Thể tích", Content: 'Lấy chiều dài nhân với chiều rộng rồi nhân với chiều cao (cùng đơn vị đo) <br> V = a x b x c <br> Kí hiệu: V là thể tích, a là chiều dài, b là chiều rộng, c là chiều cao của hình hộp chữ nhật.' }
    ],

    Shape_ID: "hinhhopchunhat",
    Practice: new Shape,
  },
  {
    Name: "Hình lập phương",
    Url: "./assets/images/rectangular.jpg",
    Defination: 'Là một hình không gian có 6 mặt, 8 đỉnh, 12 cạnh. Các mặt của hình lập phương đều là hình vuông có kích thước bằng nhau (đều có 6 mặt bằng nhau). Hình lập phương chỉ có duy nhất 1 kích thước',

    Formula: [
      { Name: "Diện tích xung quanh", Content: 'Lấy diện tích một mặt rồi nhân với 4  <br> S = a x a x 4 <br> Kí hiệu: S là diện tích xung quanh, a là cạnh của hình vuông.' },
      { Name: "Diện tích toàn phần", Content: 'Lấy diện tích một mặt rồi nhân với 6 <br> S = a x a x 6 <br> Kí hiệu: S là diện tích toàn phần, a là cạnh của hình vuông.' },
      { Name: "Thể tích", Content: 'Lấy cạnh nhân cạnh nhân cạnh <br> V = a x a x a <br> Kí hiệu: V là thể tích, a là cạnh của hình vuông.' }
    ],

    Shape_ID: "hinhlapphuong",
    Practice: new Shape,
  },
  {
    Name: "Hình trụ",
    Url: "./assets/images/rectangular.jpg",
    Defination: "Là một hình học không gian giới hạn bởi mặt trụ (mặt bên) và hai đáy là hai đường tròn bằng nhau.",

    Formula: null,

    Shape_ID: "hinhtru",
    Practice: new Shape,
  },
  {
    Name: "Hình cầu",
    Url: "./assets/images/rectangular.jpg",
    Defination: "Là một hình không gian được tạo ra khi quay nửa hình tròn một vòng quanh đường kính của hình tròn đó. Hình cầu còn gọi là một khối tròn ",
    Formula: null,
    Shape_ID: "hinhcau",
    Practice: new Shape,
  }
];

