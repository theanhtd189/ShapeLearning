const PARAMETER_TYPE = "paramater";
const RESULT_TYPE = "result";
const AREA_TYPE_NAME = "area";
const VOLUME_TYPE_NAME = "volume";
const PERIMETER_TYPE_NAME = "perimeter";
const DTXQ_TYPE_NAME = "dtxq";
const DTTP_TYPE_NAME = "dttp";
const EDGE_TYPE = "edge";

var checkInput = false;

if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

var GetInput = function (name,type=PARAMETER_TYPE) {
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

var SetFormula = function (f){
  var div = $("#formula");
  var _f = $("#formula>p#f-content");
  _f.html(f);
  div.addClass("show");
}

var SetEdgeResult = function (name,value){
  var result = GetInput(name);
  if(result!=null){
    result.val(value);
  }
  else{
    return;
  }
}

var SetPerimeterResult = function (value){
  var result = GetInput(PERIMETER_TYPE_NAME,RESULT_TYPE);
  if(result!=null){
    result.val(value);
  }
  else{
    return;
  }
}

var SetAreaResult = function (value){
  var result = GetInput(AREA_TYPE_NAME,RESULT_TYPE);
  if(result!=null){
    result.val(value);
  }
  else{
    console.log("NULL OUTPUT")
  }
}

var SetDTTPResult = function (value){
  var result = GetInput(DTTP_TYPE_NAME,RESULT_TYPE);
  if(result!=null){
    result
    .css("fontWeight","900")
    .val(value);
  }
  else{
    console.log("NULL OUTPUT")
  }
}

var SetDTXQResult = function (value){
  var result = GetInput(DTXQ_TYPE_NAME,RESULT_TYPE);
  if(result!=null){
    result
    .css("fontWeight","900")
    .val(value);
  }
  else{
    console.log("NULL OUTPUT")
  }
}

var SetVolumeResult = function (value){

  var result = GetInput(VOLUME_TYPE_NAME,RESULT_TYPE);
  console.log(result);
  if(result!=null){
    result
    .css("fontWeight","900")
    .val(value);
  }
  else{
    console.log("NULL OUTPUT")
  }
}

var Check_IS_Input_Empty = function (type=""){
  var checkEmpty = false;
  var listInput = $("input[e-name='paramater']");
    if(type!=""){
      listInput = $("input[e-name='paramater'][r-for='"+type+"']");

    }
    for(var i=0; i<listInput.length; i++){
      var e = listInput[i];
      if(e.value.trim()==""){
       // alert("Bạn chưa nhập "+e.getAttribute('e-display'));
        checkEmpty = true;
        break;
      } 
    }
    return false;
}


class Shape {
  constructor() {
    this.ShapeList = [];
    this.ShapeName = "Shape Origin";
    this.Area = true;
    this.Perimeter = true;
    this.Volume = false;
    this.DTXQ = false;
    this.DTTP = false;
    this.canh = false;
  }

  getShapeList() {
    return this.ShapeList;
  }

  setList(name, _v, type=RESULT_TYPE,required_for="") {
    if(name == AREA_TYPE_NAME){
      _v = "Diện tích";
    }
    else
    if(name == PERIMETER_TYPE_NAME){
      _v = "Chu vi";
    }
    else
    if(name == DTTP_TYPE_NAME){
      _v = "Diện tích toàn phần";
    }
    else
    if(name == DTXQ_TYPE_NAME){
      _v = "Diện tích xung quanh";
    }
    else
    if(name == VOLUME_TYPE_NAME){
      _v = "Thể tích";
    }
    else
    {
      type = PARAMETER_TYPE;
    }
    this.getShapeList().push([name, _v,type,required_for]);
  }

  setBtn() {
    var _div = $(".ShapeBtn");
    if (_div.children().length <= 0) {
      if(this.Area){
        var icon = '<i class="fas fa-square"></i>';
        var btnArea = $("<a/>")
      .addClass("btn")
      .attr("e-type", AREA_TYPE_NAME)
      .attr("e-name",RESULT_TYPE)
      .html(icon+" Tính diện tích");
      _div.append(btnArea);
      }

      if(this.Perimeter){
        var icon = '<i class="fas fa-wave-square"></i>';
        var btnPerimeter = $("<a/>")
      .addClass("btn")
      .attr("e-type", PERIMETER_TYPE_NAME)
      .attr("e-name",RESULT_TYPE)
      .html(icon+ " Tính chu vi");
      _div.append(btnPerimeter);
      }

      if (this.Volume == true) {
        var icon = '<i class="fas fa-cube"></i>';
        var btnVolume = $("<a/>")
        .addClass("btn")
        .attr("e-type", VOLUME_TYPE_NAME)
        .html(icon+" Tính thể tích");
        _div.append(btnVolume);
      }

      if (this.DTTP == true) {
        var icon = '<i class="fas fa-border-none"></i>';
        var btnDTTP = $("<a/>")
        .addClass("btn")
        .attr("e-type", DTTP_TYPE_NAME)
        .html(icon+" Tính diện tích toàn phần");
        _div.append(btnDTTP);
      }

      if (this.DTXQ == true) {
        var icon = '<i class="fas fa-circle-notch"></i>';
        var btnDTTP = $("<a/>")
        .addClass("btn")
        .attr("e-type", DTXQ_TYPE_NAME)
        .html(icon+" Tính diện tích xung quanh");
        _div.append(btnDTTP);
      }
      if (this.canh) {
        var icon = '<i class="fas fa-tenge"></i>';
        var btnCanhcv = $("<a/>")
        .addClass("btn")
        .attr("e-type", EDGE_TYPE)
        .attr('c-for',PERIMETER_TYPE_NAME)
        .html(icon+" Tính cạnh từ chu vi");
        _div.append(btnCanhcv);

        var btnCanhdt = $("<a/>")
        .addClass("btn")
        .attr('c-for',AREA_TYPE_NAME)
        .attr("e-type", EDGE_TYPE)
        .html(icon+" Tính cạnh từ diện tích");
        _div.append(btnCanhdt);
      }

      var icon = '<i class="fas fa-eraser"></i>';
      var btnClear = $('<a class="btn ClearBtn" id="clear"></a>');
      btnClear.html(icon + "     Xóa dữ liệu")
      _div.append(btnClear);

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
          .attr('r-for',_this[3])
          .attr("name", _this[0]);

        _p.append(_span);
        _p.append(_input);
        _div.append(_p);

      }
    }
  }
}

class HinhVuong extends Shape {
  constructor() {
    super();
    this.ShapeName = "hình vuông";
    this.setList("a", "Chiều dài 1 cạnh (a)");
    this.setList(PERIMETER_TYPE_NAME);
    this.setList(AREA_TYPE_NAME);
    this.canh = true;
  }
  click_Calc() {
    //diện tích
    $("a[e-type='"+AREA_TYPE_NAME+"']").click(function () {
      var is_empty = Check_IS_Input_Empty();
      if (!is_empty) {
        var canh_a = Number(GetInput("a").val());
        var tinh = canh_a * canh_a;
        var f = 'S = a x a = {0} x {0} = {1}'.format(canh_a,tinh);
        SetAreaResult(tinh);
        SetFormula(f);
      }
    });
    //Chu vi
    $("a[e-type='"+PERIMETER_TYPE_NAME+"']").click(function () {
      var is_empty = Check_IS_Input_Empty();
      if (!is_empty) {
        console.log('tinh')
        var canh_a = Number(GetInput("a").val());
        var tinh = canh_a * 4;
        var f = 'C = a x 4 = {0} x 4 = {1}'.format(canh_a, tinh);
        SetPerimeterResult(tinh);
        SetFormula(f);
      }
    });

    //tính cạnh
    $("a[e-type='"+EDGE_TYPE+"']").click(function () {
      var cvI = GetInput(PERIMETER_TYPE_NAME, RESULT_TYPE);
      var cv = cvI.val().trim();
      var dtI = GetInput(AREA_TYPE_NAME,RESULT_TYPE);
      var dt = dtI.val().trim();
      var f = '';
      
      var _type = $(this).attr('c-for');
      var a = Number(GetInput("a").val());
      var tinh = 0;

      if(_type == PERIMETER_TYPE_NAME && cv!=""){ //chu vi
        cv = Number(cv);   
        dtI.val('');

        tinh = cv / 4;
        f = 'P = a x 4 \
        <br>=> a = P : 4 \
        <br>=> a = {0} : 4 \
        <br>=> a = {1}'.format(cv,tinh);
        
      }
      else
      if(_type == AREA_TYPE_NAME && dt!="") //tính cạnh từ diện tích
      {
        dt = Number(dt);    
        cvI.val('');

        tinh = Math.sqrt(dt);
        f = 'S = a x a \
        <br> => {0} = a x a \
        <br> => a = &#8730; {0}\
        <br> => a = {1}'.format(dt,tinh);

      }

      if(tinh!= null && tinh!=0 )
      {
        SetEdgeResult("a",tinh);
        SetFormula(f);
      }
    });
  }
}

class HinhChuNhat extends Shape {
  constructor() {
    super();
    this.ShapeName = "hình chữ nhật";
    this.setList("a", "Chiều dài (a)");
    this.setList("b", "Chiều rộng (b)");
    this.setList(PERIMETER_TYPE_NAME);
    this.setList(AREA_TYPE_NAME);
    this.canh = true;
  }
  click_Calc() {
    //diện tích
    $("a[e-type='"+AREA_TYPE_NAME+"']").click(function () {
      var is_empty = Check_IS_Input_Empty();
      if (!is_empty) {
        var canh_a = Number(GetInput("a").val());
        var canh_b = Number(GetInput("b").val());
        var tinh = canh_a * canh_b;
        var f = 'S = a x b = {0} x {1} = {2}'.format(canh_a,canh_b,tinh);
        SetAreaResult(tinh);
        SetFormula(f);
      }
    });

    //Chu vi
    $("a[e-type='"+PERIMETER_TYPE_NAME+"']").click(function () {
      var is_empty = Check_IS_Input_Empty();
      if (!is_empty) {
        
        var canh_a = Number(GetInput("a").val());
        var canh_b = Number(GetInput("b").val());
        var tinh = (canh_a + canh_b)*2;
        SetPerimeterResult(tinh);
        var f = 'P = ( a + b ) x 2 = ( {0} + {1} ) x 2 = {2}'.format(canh_a,canh_b,tinh);
        SetFormula(f);
      }
    });

    //tính cạnh
    $("a[e-type='"+EDGE_TYPE+"']").click(function () {
      var cvI = GetInput(PERIMETER_TYPE_NAME, RESULT_TYPE);
      var cv = cvI.val().trim();
      var dtI = GetInput(AREA_TYPE_NAME,RESULT_TYPE);
      var dt = dtI.val().trim();
      var f = '';
      
      var _type = $(this).attr('c-for');
      var a = GetInput("a").val().trim()!=""?Number(GetInput("a").val()):0;
      var b = GetInput("b").val().trim()!=""?Number(GetInput("b").val()):0;
      var tinh = 0;
      var edge_name = "";

      if(_type == PERIMETER_TYPE_NAME && cv!=""){ //chu vi
        cv = Number(cv);   
        dtI.val('');

        if (a == 0 && b != 0) {
          tinh = cv / 2 - b;
          f = 'P = (a + b) x 2 \
        <br>=> a = P : 2 - b \
        <br>=> a = {0} : 2 - {1} \
        <br>=> a = {2}'.format(cv, b,tinh);
        edge_name = "a";
        }
        else
          if (b == 0 && a != 0) {
            tinh = cv / 2 - a;
            edge_name = "b";
          f = 'P = (a + b) x 2 \
        <br>=> b = P : 2 - a \
        <br>=> b = {0} : 2 - {1} \
        <br>=> b = {2}'.format(cv, a,tinh);
          }
        
      }
      else
      if(_type == AREA_TYPE_NAME && dt!="") //tính cạnh từ diện tích
      {
        dt = Number(dt);    
        cvI.val('');

        if (a == 0 && b != 0) {
          tinh = dt / b;
          edge_name = "a";
          f = 'S = a x b \
        <br>=> a = S : b \
        <br>=> a = {0} : {1} \
        <br>=> a = {2}'.format(dt, b,tinh);
        }
        else
          if (b == 0 && a != 0) {
            tinh = dt / a;
            edge_name = "b";
          f = 'S = a x b \
        <br>=> a = S : b \
        <br>=> a = {0} : {1} \
        <br>=> a = {2}'.format(dt, a,tinh);
          }

      }

      if(tinh!= null && tinh!=0 )
      {
        SetEdgeResult(edge_name,tinh);
        SetFormula(f);
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
        var canh_a = Number(GetInput("a").val());
        var canh_h = Number(GetInput("h").val());
        var tinh = canh_a * canh_h;
        SetAreaResult(tinh);

        var f = 'S = a x h = {0} x {1} = {2}'.format(canh_a,canh_h,tinh);
        SetFormula(f);
      }
    });
    //Chu vi
    $("a[e-type='"+PERIMETER_TYPE_NAME+"']").click(function () {
      var is_empty = Check_IS_Input_Empty();
      if (!is_empty) {
        
        var canh_a = Number(GetInput("a").val());
        var canh_b = Number(GetInput("b").val());

        var tinh = (canh_a + canh_b)*2;
        SetPerimeterResult(tinh);

        var f = 'P = ( a + b ) x 2 = ( {0} + {1} ) x2 = {2}'.format(canh_a,canh_h,tinh);
        SetFormula(f);
      }
    });
  }
}

class HinhThang extends Shape {
  constructor() {
    super();
    this.ShapeName = "hình thang";
    this.setList("a", "Đáy lớn (a)");
    this.setList("b", "Đáy bé (b)");
    this.setList("c", "Cạnh bên (c)");
    this.setList("d", "Cạnh bên (d)");
    this.setList("h","Chiều cao (h)");
    this.setList(AREA_TYPE_NAME);
    this.setList(PERIMETER_TYPE_NAME);
    this.canh = true;
  }
  click_Calc() {
    //diện tích
    $("a[e-type='"+AREA_TYPE_NAME+"']").click(function () {
      var is_empty = Check_IS_Input_Empty();
      if (!is_empty) {
        var a = Number(GetInput("a").val());
        var b = Number(GetInput("b").val());
        var h = Number(GetInput("h").val());

        var tinh = (a + b)*h/2;
        SetAreaResult(tinh);
        var f = 'S = ( a + b ) x h  : 2\
        <br>=> S = ( {0} + {1} ) x {2} / 2\
        <br>=> S = {3} '.format(a,b,h,tinh);
        SetFormula(f);
      }
    });
    //Chu vi
    $("a[e-type='"+PERIMETER_TYPE_NAME+"']").click(function () {
      var is_empty = Check_IS_Input_Empty();
      if (!is_empty) {
        var a = Number(GetInput("a").val());
        var b = Number(GetInput("b").val());
        var c = GetInput("c").val();
        var d = GetInput("d").val();

        var tinh = Number(a) + Number(b) + Number(c) + Number(d);
        SetPerimeterResult(tinh);
        var f = 'S =  a + b + c + d\
        <br>=> S = {0} + {1} + {2} + {3}\
        <br>=> S = {4} '.format(a,b,c,d,tinh);
        SetFormula(f);
      }
    });

    //tính cạnh
    $("a[e-type='"+EDGE_TYPE+"']").click(function () {
      var cvI = GetInput(PERIMETER_TYPE_NAME, RESULT_TYPE);
      var cv = cvI.val().trim();
      var dtI = GetInput(AREA_TYPE_NAME,RESULT_TYPE);
      var dt = dtI.val().trim();
      var f = '';
      
      var _type = $(this).attr('c-for');
      var a = GetInput("a").val().trim()!=""?Number(GetInput("a").val()):0;
      var b = GetInput("b").val().trim()!=""?Number(GetInput("b").val()):0;
      var c = GetInput("c").val().trim()!=""?Number(GetInput("c").val()):0;
      var d = GetInput("d").val().trim()!=""?Number(GetInput("d").val()):0;
      var h = GetInput("h").val().trim()!=""?Number(GetInput("h").val()):0;

      var tinh = 0;
      var edge_name = "";

      if(_type == PERIMETER_TYPE_NAME && cv!=""){ //chu vi
        cv = Number(cv);   
        dtI.val('');

        if (a == 0 && b != 0 && c != 0 && d != 0) {
          tinh = cv - b - c - d;
          f = 'P = a + b + c + d\
        <br>=> a = P - b - c -d \
        <br>=> a = {0} - {1} - {2} - {3} \
        <br>=> a = {4}'.format(cv, b, c, d, tinh);
        edge_name = "a";
        }
        else if (b == 0 && c != 0 && c != 0 && d != 0) {
          tinh = cv - a - c -d;
          f = 'P = a + b + c + d\
        <br>=> b = P - a - c -d \
        <br>=> b = {0} - {1} - {2} - {3} \
        <br>=> b = {4}'.format(cv, a, c, d, tinh);
        edge_name = "b";
        }
        else if (c == 0 && b != 0 && d != 0 && d != 0) {
          tinh = cv - b - a - d;
          f = 'P = a + b + c + d\
        <br>=> c = P - b - a -d \
        <br>=> c = {0} - {1} - {2} - {3} \
        <br>=> c = {4}'.format(cv, b, a, d, tinh);
        edge_name = "c";
        }     
        else if (d == 0 && b != 0 && c != 0 && a != 0) {
          tinh = cv - a - b - c;
          f = 'P = a + b + c + d\
        <br>=> d = P - b - c - a \
        <br>=> d = {0} - {1} - {2} - {3} \
        <br>=> d = {4}'.format(cv, b, c, a, tinh);
        edge_name = "d";
        }
      }
      else
      if(_type == AREA_TYPE_NAME && dt!="") //tính cạnh từ diện tích
      {
        dt = Number(dt);    
        cvI.val('');

        if (h==0 && a != 0 && b != 0) {
          tinh = 2 * dt / ( a + b );
          edge_name = "h";
          f = 'S = ( a + b ) x h : 2  \
        <br>=> h = 2 x S : ( a + b ) \
        <br>=> h = 2 x {0} : ( {1} + {2} ) \
        <br>=> h = {3}'.format(dt, a, b, tinh);
        }
        else if (a==0 && h != 0 && b != 0) {
          tinh = ( 2 * dt / h ) - b;
          edge_name = "a";
          f = 'S = ( a + b ) x h : 2  \
        <br>=> a = ( 2 x S : h ) - b \
        <br>=> a = ( 2 x {0} : {1} ) - {2} \
        <br>=> a = {3}'.format(dt, h, b,  tinh);
        }
        else if (b==0 && h != 0 && a != 0) {
          tinh = ( 2 * dt / h ) - a;
          edge_name = "b";
          f = 'S = ( a + b ) x h : 2  \
        <br>=> b = ( 2 x S : h ) - a \
        <br>=> b = ( 2 x {0} : {1} ) - {2} \
        <br>=> b = {3}'.format(dt, dt, h, a,  tinh);
        }
      }

      if(tinh!= null && tinh!=0 )
      {
        tinh = Math.round(tinh * 100 ) / 100;
        SetEdgeResult(edge_name,tinh);
        SetFormula(f);
      }
    });
  }
}

class HinhTron extends Shape {
  constructor() {
    super();
    this.ShapeName = "hình tròn";
    this.setList("r", "Đường kính");
    this.setList("d", "Bán kính");
    this.setList("area", "Diện tích");
    this.setList("perimeter", "Diện tích");
  }
  click_Calc() {
    //diện tích
    $("a[e-type='"+AREA_TYPE_NAME+"']").click(function () {
      var is_empty = Check_IS_Input_Empty();
      if (!is_empty) {
        var canh_r = Number(GetInput("r").val());
        var tinh = canh_r * canh_r * 3.14;
        var f = 'S = r x r x 3,14 = {0} x {0} x 3,14 = {1}'.format(canh_r,tinh);
        SetFormula(f);
        SetAreaResult(tinh);
      }
    });
    //Chu vi
    $("a[e-type='"+PERIMETER_TYPE_NAME+"']").click(function () {
      var is_empty = Check_IS_Input_Empty();
      if (!is_empty) {
        var canh_d = Number(GetInput("d").val());
        var tinh = canh_d * 3.14;
        SetPerimeterResult(tinh);
        var f = 'P = d x 3,14 = {0} x 3,14 = {1}'.format(canh_d,tinh);
        SetFormula(f);
      }
    });
  }
}

class HinhTamGiac extends Shape {
  constructor() {
    super();
    this.ShapeName = "hình tam giác";
    this.setList("a", "Cạnh a");
    this.setList("b", "Cạnh b");
    this.setList("c", "Cạnh c");
    this.setList("h", "Chiều cao (h)");
    this.setList(PERIMETER_TYPE_NAME);
    this.setList(AREA_TYPE_NAME);
    this.canh = true;
  }

  click_Calc() {
    //diện tích
    $("a[e-type='"+AREA_TYPE_NAME+"']").click(function () {
      var is_empty = Check_IS_Input_Empty();
      if (!is_empty) {
        var canh_a = Number(GetInput("a").val());
        var canh_h = Number(GetInput("h").val());
        var tinh = (canh_a * canh_h)/2;
        SetAreaResult(tinh);
        var f = 'S = a x h / 2\
        <br>=> S = {0} x {1} / 2\
        <br>=> S = {2}'.format(canh_a, canh_h, tinh);
        SetFormula(f);
      }
    });
    //Chu vi
    $("a[e-type='"+PERIMETER_TYPE_NAME+"']").click(function () {
      var is_empty = Check_IS_Input_Empty();
      if (!is_empty) {
        
        var canh_a = Number(GetInput("a").val());
        var canh_b = Number(GetInput("b").val());
        var canh_c = Number(GetInput("c").val());

        var tinh = (canh_a + canh_b + canh_c);
        SetPerimeterResult(tinh);
        var f = 'P = a + b + c \
        <br>=> P = {0} + {1} + {3}\
        <br>=> P = {3}'.format(canh_a, canh_b , canh_c, tinh);
        SetFormula(f);
      }
    });

        //tính cạnh
        $("a[e-type='"+EDGE_TYPE+"']").click(function () {
          var cvI = GetInput(PERIMETER_TYPE_NAME, RESULT_TYPE);
          var cv = cvI.val().trim();
          var dtI = GetInput(AREA_TYPE_NAME,RESULT_TYPE);
          var dt = dtI.val().trim();
          var f = '';
          
          var _type = $(this).attr('c-for');
          var a = GetInput("a").val().trim()!=""?Number(GetInput("a").val()):0;
          var b = GetInput("b").val().trim()!=""?Number(GetInput("b").val()):0;
          var c = GetInput("c").val().trim()!=""?Number(GetInput("c").val()):0;
          var h = GetInput("h").val().trim()!=""?Number(GetInput("h").val()):0;

          var tinh = 0;
          var edge_name = "";
    
          console.log(_type)
          if(_type == PERIMETER_TYPE_NAME && cv!=""){ //chu vi
            cv = Number(cv);   
            dtI.val('');
    
            if (a == 0 && c!= 0 && b != 0) {
              tinh = cv - b - c;
              f = 'P = ( a + b + c) \
            <br>=> a = P - b - c \
            <br>=> a = {0} - {1} - {2} \
            <br>=> a = {3}'.format(cv, b, c,tinh);
            edge_name = "a";
            }
            else
            if (b == 0 && a!= 0 && c != 0) {
              tinh = cv - a - c;
              f = 'P = ( a + b + c) \
            <br>=> b = P - a - c \
            <br>=> b = {0} - {1} - {2} \
            <br>=> b = {3}'.format(cv, a, c,tinh);
            edge_name = "b";
            }
            else if (c == 0 && a!= 0 && b != 0) {
              tinh = cv - a - b;
              f = 'P = ( a + b + c) \
            <br>=> c = P - a - b \
            <br>=> c = {0} - {1} - {2} \
            <br>=> c = {3}'.format(cv, a, b,tinh);
            edge_name = "c";
            }
            
          }
          else
          if(_type == AREA_TYPE_NAME && dt!="") //tính cạnh từ diện tích
          {
            dt = Number(dt);    
            cvI.val('');
              
            console.log(b != 0 && a == 0)
            if (a == 0 && h != 0) {
              tinh = 2 * dt / h;
              edge_name = "a";
              f = 'S = a x h / 2\
            <br>=> a = 2 x S : h\
            <br>=> a = 2 x {0} : {1} \
            <br>=> a = {2}'.format(dt,h,tinh);
            }
            else
              if (h == 0 && a != 0) {
                tinh = 2 * dt / a;
                edge_name = "h";
                f = 'S = a x h / 2\
                <br>=> h = 2 x S : a\
                <br>=> h = 2 x {0} : {1} \
                <br>=> h = {2}'.format(dt,a,tinh);
              }
    
          }
          
          if(tinh!= null && tinh!=0 )
          {
            SetEdgeResult(edge_name,tinh);
            SetFormula(f);
          }
        });
  }
}

class HinhThoi extends Shape {
  constructor() {
    super();
    this.ShapeName = "hình thoi";
    this.setList("a","Cạnh a");
    this.setList("m", "Đường chéo m");
    this.setList("n", "Đường chéo n");
    this.setList(PERIMETER_TYPE_NAME);
    this.setList(AREA_TYPE_NAME);
  }

  click_Calc() {
    //diện tích
    $("a[e-type='"+AREA_TYPE_NAME+"']").click(function () {
      var is_empty = Check_IS_Input_Empty();
      if (!is_empty) {
        var canh_m = Number(GetInput("m").val());
        var canh_n = Number(GetInput("n").val());
        var tinh = (canh_m * canh_n)/2;
        SetAreaResult(tinh);
        var f = 'S = m x n : 2\
        <br>=> S = {0} x {1} : 2 \
        <br>=> S = {2}'.format(canh_m,canh_n,tinh);
        SetFormula(f);
      }
    });
    //Chu vi
    $("a[e-type='"+PERIMETER_TYPE_NAME+"']").click(function () {
      var is_empty = Check_IS_Input_Empty();
      if (!is_empty) {     
        var canh_a = Number(GetInput("a").val());
        var tinh = canh_a * 4;
        SetPerimeterResult(tinh);
        var f = 'P = a x 4 \
        <br>=> P = {0} x 4 \
        <br>=> P = {1}'.format(canh_a,tinh);
        SetFormula(f);
      }
    });
  }
}

class HinhHopChuNhat extends Shape {
  constructor() {
    super();
    this.ShapeName = "hình hộp chữ nhật";
    this.Volume = true;
    this.Perimeter = false;
    this.Area = false;
    this.DTTP = true;
    this.DTXQ = true;

    this.setList("a", "Chiều dài");
    this.setList("b", "Chiều rộng");
    this.setList("h","Chiều cao");
    this.setList(DTTP_TYPE_NAME);
    this.setList(DTXQ_TYPE_NAME);
    this.setList(VOLUME_TYPE_NAME);
  }
  click_Calc() {
    //diện tích tp
    $("a[e-type='"+DTTP_TYPE_NAME+"']").click(function () {
      var is_empty = Check_IS_Input_Empty();
      if (!is_empty) {
        var a = Number(GetInput("a").val());
        var b = Number(GetInput("b").val());
        var h = Number(GetInput("h").val());

        var tinh = (a + b) * 2 * h + (a * b * 2);
        SetDTTPResult(tinh);

        var f = 'Stp = (a + b) x 2 x h + (a x b x 2) \
        <br>=> Stp = ({0} + {1}) x 2 x {3} + ({0} x {1} x 2) \
        <br>=> Stp = {3}'.format(a,b,h,tinh);
        SetFormula(f);
      }
    });
    //diện tích xq
    $("a[e-type='"+DTXQ_TYPE_NAME+"']").click(function () {
      var is_empty = Check_IS_Input_Empty();
      if (!is_empty) {     
        var a = Number(GetInput("a").val());
        var b = Number(GetInput("b").val());
        var h = Number(GetInput("h").val());
        var tinh = (a+b)*2*h;
        SetDTXQResult(tinh);

        var f = 'Sxq = (a + b) x 2 x h \
        <br>=> Sxq = ({0} + {1}) x 2 x {2} \
        <br>=> Sxq = {3}'.format(a,b,h,tinh);
        SetFormula(f);
      }
    });
    //the tích
    $("a[e-type='"+VOLUME_TYPE_NAME+"']").click(function () {
      var is_empty = Check_IS_Input_Empty();
      if (!is_empty) {     
        var a = Number(GetInput("a").val());
        var b = Number(GetInput("b").val());
        var h = Number(GetInput("h").val());
        var tinh = (a*b)*h;
        SetVolumeResult(tinh);

        var f = 'V = a x b x h \
        <br>=> V = {0} x {1} x {2} \
        <br>=> V = {3}'.format(a,b,h,tinh);
        SetFormula(f);
      }
    });
  }
}

class HinhLapPhuong extends Shape {
  constructor() {
    super();
    this.ShapeName = "hình lập phương";
    this.setList("a","Độ dài cạnh a");
    this.setList(DTTP_TYPE_NAME);
    this.setList(DTXQ_TYPE_NAME);
    this.setList(VOLUME_TYPE_NAME);
    this.Volume = true;
    this.Perimeter = false;
    this.Area = false;
    this.DTTP = true;
    this.DTXQ = true;
  }

  click_Calc() {
    //diện tích tp
    $("a[e-type='"+DTTP_TYPE_NAME+"']").click(function () {
      var is_empty = Check_IS_Input_Empty();
      if (!is_empty) {
        var a = Number(GetInput("a").val());
        var tinh = a*a*6;
        SetDTTPResult(tinh);

        var f = 'Stp = a x a x 6 \
        <br>=> Stp = {0} x {0} x 6 \
        <br>=> Stp = {1}'.format(a,tinh);
        SetFormula(f);
      }
    });
    //diện tích xq
    $("a[e-type='"+DTXQ_TYPE_NAME+"']").click(function () {
      var is_empty = Check_IS_Input_Empty();
      if (!is_empty) {     
        var a = Number(GetInput("a").val());

        var tinh = a*a*4;
        SetDTXQResult(tinh);

        var f = 'Sxq = a x a x 4 \
        <br>=> Sxq = {0} x {0} x 4 \
        <br>=> Sxq = {1}'.format(a,tinh);
        SetFormula(f);
      }
    });
    //the tích
    $("a[e-type='"+VOLUME_TYPE_NAME+"']").click(function () {
      var is_empty = Check_IS_Input_Empty();
      if (!is_empty) {     
        var a = Number(GetInput("a").val());

        var tinh = a*a*a;
        SetVolumeResult(tinh);

        var f = 'Sxq = a x a x a \
        <br>=> Sxq = {0} x {0} x {0} \
        <br>=> Sxq = {1}'.format(a,tinh);
        SetFormula(f);
      }
    });
  }
}

class HinhTru extends Shape {
  constructor() {
    super();
    this.ShapeName = "hình trụ";
    this.setList("a", "Chiều dài");
    this.setList("b", "Chiều rộng");
    this.setList("area", "Diện tích");
    this.Volume = true;
    this.Perimeter = false;
    this.Area = false;
    this.DTTP = true;
    this.DTXQ = true;
  }
  click_Calc() {
    //diện tích tp
    $("a[e-type='"+DTTP_TYPE_NAME+"']").click(function () {
      var is_empty = Check_IS_Input_Empty();
      if (!is_empty) {
        var a = Number(GetInput("a").val());
        var tinh = a*a*6;
        SetDTTPResult(tinh);
      }
    });
    //diện tích xq
    $("a[e-type='"+DTXQ_TYPE_NAME+"']").click(function () {
      var is_empty = Check_IS_Input_Empty();
      if (!is_empty) {     
        var a = Number(GetInput("a").val());

        var tinh = a*a*4;
        SetDTXQResult(tinh);
      }
    });
    //the tích
    $("a[e-type='"+VOLUME_TYPE_NAME+"']").click(function () {
      var is_empty = Check_IS_Input_Empty();
      if (!is_empty) {     
        var a = Number(GetInput("a").val());

        var tinh = a*a*a;
        SetVolumeResult(tinh);
      }
    });
  }
}

class HinhCau extends Shape {
  constructor() {
    super();
    this.ShapeName = "hình chữ nhật";
    this.setList("a", "Chiều dài");
    this.setList("b", "Chiều rộng");
    this.setList("area", "Diện tích");
  }
}

var getListShapeNameDB = function () {
  var list = 
  [
      ["Hình vuông",HinhVuong],//
      ["Hình chữ nhật",HinhChuNhat],//
      ["Hình bình hành",HinhBinhHanh],
      ["Hình thang",HinhThang],//
      ["Hình tròn",HinhTron],
      ["Hình tam giác",HinhTamGiac],//
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
      { Name: "Chu vi", Content: 'Lấy tổng độ dài 3 cạnh. <br> P= a + b + c <br> Kí hiệu: P là chu vi, a,b và c là độ dài ba cạnh của hình tam giác.' }
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
      { Name: "Thể tích", Content: 'Lấy chiều dài nhân với chiều rộng rồi nhân với chiều cao (cùng đơn vị đo) \
      <br> V = a x b x h <br> Kí hiệu: V là thể tích, a là chiều dài, b là chiều rộng, h là chiều cao của hình hộp chữ nhật.' }
    ],

    Shape_ID: "hinhhopchunhat",
    Practice: new Shape,
  },
  {
    Name: "Hình lập phương",
    Url: "./assets/images/hinhlapphuong.jpg",
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
    Url: "./assets/images/hinhtru.jpg",
    Defination: "Là một hình học không gian giới hạn bởi mặt trụ (mặt bên) và hai đáy là hai đường tròn bằng nhau.",
    Formula: null,
    Shape_ID: "hinhtru",
    Practice: "",
  },
  {
    Name: "Hình cầu",
    Url: "./assets/images/hinhcau.jpg",
    Defination: "Là một hình không gian được tạo ra khi quay nửa hình tròn một vòng quanh đường kính của hình tròn đó. Hình cầu còn gọi là một khối tròn ",
    Formula: null,
    Shape_ID: "hinhcau",
    Practice: "",
  }
];

