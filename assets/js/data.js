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
       // alert("B???n ch??a nh???p "+e.getAttribute('e-display'));
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
      _v = "Di???n t??ch";
    }
    else
    if(name == PERIMETER_TYPE_NAME){
      _v = "Chu vi";
    }
    else
    if(name == DTTP_TYPE_NAME){
      _v = "Di???n t??ch to??n ph???n";
    }
    else
    if(name == DTXQ_TYPE_NAME){
      _v = "Di???n t??ch xung quanh";
    }
    else
    if(name == VOLUME_TYPE_NAME){
      _v = "Th??? t??ch";
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
      .html(icon+" T??nh di???n t??ch");
      _div.append(btnArea);
      }

      if(this.Perimeter){
        var icon = '<i class="fas fa-wave-square"></i>';
        var btnPerimeter = $("<a/>")
      .addClass("btn")
      .attr("e-type", PERIMETER_TYPE_NAME)
      .attr("e-name",RESULT_TYPE)
      .html(icon+ " T??nh chu vi");
      _div.append(btnPerimeter);
      }

      if (this.Volume == true) {
        var icon = '<i class="fas fa-cube"></i>';
        var btnVolume = $("<a/>")
        .addClass("btn")
        .attr("e-type", VOLUME_TYPE_NAME)
        .html(icon+" T??nh th??? t??ch");
        _div.append(btnVolume);
      }

      if (this.DTTP == true) {
        var icon = '<i class="fas fa-border-none"></i>';
        var btnDTTP = $("<a/>")
        .addClass("btn")
        .attr("e-type", DTTP_TYPE_NAME)
        .html(icon+" T??nh di???n t??ch to??n ph???n");
        _div.append(btnDTTP);
      }

      if (this.DTXQ == true) {
        var icon = '<i class="fas fa-circle-notch"></i>';
        var btnDTTP = $("<a/>")
        .addClass("btn")
        .attr("e-type", DTXQ_TYPE_NAME)
        .html(icon+" T??nh di???n t??ch xung quanh");
        _div.append(btnDTTP);
      }
      if (this.canh) {
        var icon = '<i class="fas fa-tenge"></i>';
        var btnCanhcv = $("<a/>")
        .addClass("btn")
        .attr("e-type", EDGE_TYPE)
        .attr('c-for',PERIMETER_TYPE_NAME)
        .html(icon+" T??nh c???nh t??? chu vi");
        _div.append(btnCanhcv);

        var btnCanhdt = $("<a/>")
        .addClass("btn")
        .attr('c-for',AREA_TYPE_NAME)
        .attr("e-type", EDGE_TYPE)
        .html(icon+" T??nh c???nh t??? di???n t??ch");
        _div.append(btnCanhdt);
      }

      var icon = '<i class="fas fa-eraser"></i>';
      var btnClear = $('<a class="btn ClearBtn" id="clear"></a>');
      btnClear.html(icon + "     X??a d??? li???u")
      _div.append(btnClear);

    }
  }

  setUI() {
    var list  = this.ShapeList;
    console.log('set ui for ',this.ShapeName)
    console.log(list)

    var _name = $(".shape-name");
    _name.text("Cho " + this.ShapeName + " c??:");

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
    this.ShapeName = "h??nh vu??ng";
    this.setList("a", "Chi???u d??i 1 c???nh (a)");
    this.setList(PERIMETER_TYPE_NAME);
    this.setList(AREA_TYPE_NAME);
    this.canh = true;
  }
  click_Calc() {
    //di???n t??ch
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

    //t??nh c???nh
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
      if(_type == AREA_TYPE_NAME && dt!="") //t??nh c???nh t??? di???n t??ch
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
    this.ShapeName = "h??nh ch??? nh???t";
    this.setList("a", "Chi???u d??i (a)");
    this.setList("b", "Chi???u r???ng (b)");
    this.setList(PERIMETER_TYPE_NAME);
    this.setList(AREA_TYPE_NAME);
    this.canh = true;
  }
  click_Calc() {
    //di???n t??ch
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

    //t??nh c???nh
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
      if(_type == AREA_TYPE_NAME && dt!="") //t??nh c???nh t??? di???n t??ch
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
    this.ShapeName = "h??nh b??nh h??nh";
    this.setList("a", "Chi???u d??i (c???nh b??n)");
    this.setList("b", "Chi???u r???ng (c???nh ????y)");
    this.setList("h", "Chi???u cao");
    this.setList(PERIMETER_TYPE_NAME);
    this.setList(AREA_TYPE_NAME);
  }
  click_Calc() {
    //di???n t??ch
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
    this.ShapeName = "h??nh thang";
    this.setList("a", "????y l???n (a)");
    this.setList("b", "????y b?? (b)");
    this.setList("c", "C???nh b??n (c)");
    this.setList("d", "C???nh b??n (d)");
    this.setList("h","Chi???u cao (h)");
    this.setList(AREA_TYPE_NAME);
    this.setList(PERIMETER_TYPE_NAME);
    this.canh = true;
  }
  click_Calc() {
    //di???n t??ch
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

    //t??nh c???nh
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
      if(_type == AREA_TYPE_NAME && dt!="") //t??nh c???nh t??? di???n t??ch
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
    this.ShapeName = "h??nh tr??n";
    this.setList("r", "???????ng k??nh");
    this.setList("d", "B??n k??nh");
    this.setList("area", "Di???n t??ch");
    this.setList("perimeter", "Di???n t??ch");
  }
  click_Calc() {
    //di???n t??ch
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
    this.ShapeName = "h??nh tam gi??c";
    this.setList("a", "C???nh a");
    this.setList("b", "C???nh b");
    this.setList("c", "C???nh c");
    this.setList("h", "Chi???u cao (h)");
    this.setList(PERIMETER_TYPE_NAME);
    this.setList(AREA_TYPE_NAME);
    this.canh = true;
  }

  click_Calc() {
    //di???n t??ch
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

        //t??nh c???nh
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
          if(_type == AREA_TYPE_NAME && dt!="") //t??nh c???nh t??? di???n t??ch
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
    this.ShapeName = "h??nh thoi";
    this.setList("a","C???nh a");
    this.setList("m", "???????ng ch??o m");
    this.setList("n", "???????ng ch??o n");
    this.setList(PERIMETER_TYPE_NAME);
    this.setList(AREA_TYPE_NAME);
  }

  click_Calc() {
    //di???n t??ch
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
    this.ShapeName = "h??nh h???p ch??? nh???t";
    this.Volume = true;
    this.Perimeter = false;
    this.Area = false;
    this.DTTP = true;
    this.DTXQ = true;

    this.setList("a", "Chi???u d??i");
    this.setList("b", "Chi???u r???ng");
    this.setList("h","Chi???u cao");
    this.setList(DTTP_TYPE_NAME);
    this.setList(DTXQ_TYPE_NAME);
    this.setList(VOLUME_TYPE_NAME);
  }
  click_Calc() {
    //di???n t??ch tp
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
    //di???n t??ch xq
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
    //the t??ch
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
    this.ShapeName = "h??nh l???p ph????ng";
    this.setList("a","????? d??i c???nh a");
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
    //di???n t??ch tp
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
    //di???n t??ch xq
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
    //the t??ch
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
    this.ShapeName = "h??nh tr???";
    this.setList("a", "Chi???u d??i");
    this.setList("b", "Chi???u r???ng");
    this.setList("area", "Di???n t??ch");
    this.Volume = true;
    this.Perimeter = false;
    this.Area = false;
    this.DTTP = true;
    this.DTXQ = true;
  }
  click_Calc() {
    //di???n t??ch tp
    $("a[e-type='"+DTTP_TYPE_NAME+"']").click(function () {
      var is_empty = Check_IS_Input_Empty();
      if (!is_empty) {
        var a = Number(GetInput("a").val());
        var tinh = a*a*6;
        SetDTTPResult(tinh);
      }
    });
    //di???n t??ch xq
    $("a[e-type='"+DTXQ_TYPE_NAME+"']").click(function () {
      var is_empty = Check_IS_Input_Empty();
      if (!is_empty) {     
        var a = Number(GetInput("a").val());

        var tinh = a*a*4;
        SetDTXQResult(tinh);
      }
    });
    //the t??ch
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
    this.ShapeName = "h??nh ch??? nh???t";
    this.setList("a", "Chi???u d??i");
    this.setList("b", "Chi???u r???ng");
    this.setList("area", "Di???n t??ch");
  }
}

var getListShapeNameDB = function () {
  var list = 
  [
      ["H??nh vu??ng",HinhVuong],//
      ["H??nh ch??? nh???t",HinhChuNhat],//
      ["H??nh b??nh h??nh",HinhBinhHanh],
      ["H??nh thang",HinhThang],//
      ["H??nh tr??n",HinhTron],
      ["H??nh tam gi??c",HinhTamGiac],//
      ["H??nh thoi",HinhThoi],
      ["H??nh h???p ch??? nh???t",HinhHopChuNhat],
      ["H??nh l???p ph????ng",HinhLapPhuong],
      ["H??nh tr???",HinhTru],
      ["H??nh c???u",HinhCau],
  ];
  return list;
}

const database = [
  {
    Name: "H??nh vu??ng",
    Url: "./assets/images/square.jpg",
    Defination: "L?? h??nh t??? gi??c c?? 4 c???nh song song v?? b???ng nhau, c?? 4 ?????nh v?? 4 g??c vu??ng. ",
    Formula: [
      { Name: "Chu vi", Content: 'L???y ????? d??i 1 c???nh r???i nh??n v???i 4. <br> P = a x 4 <br> K?? hi???u: P l?? chu vi, a l?? ????? d??i 1 c???nh.' },
      { Name: "Di???n t??ch", Content: 'L???y ????? d??i 1 c???nh r???i nh??n v???i ch??nh n??. <br> S = a x a <br> K?? hi???u: S l?? di???n t??ch, a l?? ????? d??i 1 c???nh.' }
    ],
    Color: "rgb(53 39 237)",
    Shape_ID: "square",
    Practice: new Shape,
  },
  {
    Name: "H??nh ch??? nh???t",
    Url: "./assets/images/rectangle.jpg",
    Defination: "L?? h??nh t??? gi??c c?? 2 c???p c???nh ?????i di???n song song v?? b???ng nhau, c?? 4 ?????nh v?? 4 g??c vu??ng.",
    Color: "rgb(255 77 44)",
    Formula: [
      { Name: "Chu vi", Content: 'L???y chi???u d??i c???ng chi???u r???ng (c??ng ????n v??? ??o) r???i nh??n v???i 2. <br> P = (a + b) x 2 <br> K?? hi???u: P l?? chu vi, a l?? chi???u d??i, b l?? chi???u r???ng c???a h??nh ch??? nh???t.' },
      { Name: "Di???n t??ch", Content: 'L???y chi???u d??i nh??n chi???u r???ng (c??ng ????n v??? ??o). <br> S = a x b <br> K?? hi???u: S l?? di???n t??ch, a l?? chi???u d??i, b l?? chi???u r???ng c???a h??nh ch??? nh???t.' }
    ],
    Shape_ID: "rectangle",
    Practice: new Shape,
  },
  {
    Name: "H??nh b??nh h??nh",
    Url: "./assets/images/parallelogram.jpg",
    Defination: "L?? h??nh t??? gi??c c?? 2 c???p c???nh ?????i di???n, song song v?? b???ng nhau. C?? 4 ?????nh, c?? 4 g??c (c??c g??c ?????i b???ng nhau). Hai ???????ng ch??o c???t nhau t???i trung ??i???m c???a m???i ???????ng. ",

    Formula: [
      { Name: "Chu vi", Content: 'L???y chi???u d??i c???ng chi???u r???ng (c??ng ????n v??? ??o) r???i nh??n v???i 2. <br> P = (a + b) x 2 <br> K?? hi???u: P l?? chu vi, a l?? chi???u d??i, b l?? chi???u r???ng c???a h??nh b??nh h??nh.' },
      { Name: "Di???n t??ch", Content: 'L???y ????? d??i ????y nh??n v???i chi???u cao (c??ng ????n v??? ??o). <br> S = a x h <br> K?? hi???u: S l?? di???n t??ch, a l?? ????? d??i ????y, h l?? chi???u cao c???a h??nh b??nh h??nh.' }
    ],

    Shape_ID: "parallelogram",
    Practice: new Shape,
  },
  {
    Name: "H??nh thang",
    Url: "./assets/images/trapezoid.jpg",
    Defination: "H??nh thang l?? h??nh t??? gi??c c?? hai c???nh ?????i di???n song song v?? c?? hai ????y l?? ????y b?? v?? ????y l???n, c?? 2 c???nh b??n, c?? 4 ?????nh, 4 g??c. <br> C??c lo???i h??nh thang: h??nh thang th?????ng, h??nh thang vu??ng (1 c???nh b??n vu??ng g??c v???i 2 ????y).",

    Formula: [
      { Name: "Chu vi", Content: 'L???y t???ng ????? d??i 4 c???nh. <br> P = a + b + c + d <br> K?? hi???u: P l?? chu vi, a l?? ????? d??i ????y l???n, b l?? ????? d??i ????y b??, c v?? d l?? hai c???nh b??n c???a h??nh thang.' },
      { Name: "Di???n t??ch", Content: 'L???y t???ng ????? d??i 2 ????y nh??n v???i chi???u cao (c??ng ????n v??? ????) r???i chia cho 2 <br> <img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/8b09636e5437562f6747600281211b9f990e9982" class="mwe-math-fallback-image-inline" aria-hidden="true" style="vertical-align: -1.838ex; width:16.49ex; height:5.676ex;" alt="{\displaystyle S={\frac {(a+b)\times h}{2}}}"> <br> K?? hi???u: S l?? di???n t??ch, a v?? b l?? ????y l???n v?? ????y b??, h l?? chi???u cao c???a h??nh thang.' }
    ],

    Shape_ID: "trapezoid",
    Practice: new Shape,
  },
  {
    Name: "H??nh tr??n",
    Url: "./assets/images/circle.jpg",
    Defination: "H??nh tr??n l?? t???p h???p t???t c??? c??c ??i???m n???m b??n trong v?? b??n tr??n ???????ng tr??n hay n?? l?? t???p h???p c??c ??i???m c??ch t??m m???t kho???ng nh??? h??n ho???c b???ng b??n k??nh.",

    Formula: [
      { Name: "Chu vi", Content: 'L???y ???????ng k??nh nh??n v???i s??? 3,14 (s??? ??) ho???c l???y b??n k??nh nh??n 2 nh??n 3,14 . <br> P = d x 3,14 ho???c P = r x 2 x 3,14 <br> K?? hi???u: P l?? chu vi, d l?? ???????ng k??nh, r l?? b??n k??nh c???a h??nh tr??n.' },
      { Name: "Di???n t??ch", Content: 'L???y b??n k??nh nh??n v???i b??n k??nh r???i nh??n v???i s??? 3,14 (s??? ??) <br> S = r x r x 3,14 <br> K?? hi???u: S l?? di???n t??ch, r l?? b??n k??nh l?? c???a h??nh tr??n.' }
    ],

    Shape_ID: "circle",
    Practice: new Shape,
  },
  {
    Name: "H??nh tam gi??c",
    Url: "./assets/images/triangle.jpg",
    Defination: "L?? h??nh c?? 3 c???nh, 3 ?????nh v?? 3 g??c. C??c lo???i h??nh tam gi??c: tam gi??c th?????ng, tam gi??c vu??ng, tam gi??c c??n, tam gi??c ?????u. ",

    Formula: [
      { Name: "Chu vi", Content: 'L???y t???ng ????? d??i 3 c???nh. <br> P= a + b + c <br> K?? hi???u: P l?? chu vi, a,b v?? c l?? ????? d??i ba c???nh c???a h??nh tam gi??c.' }
      ,
      { Name: "Di???n t??ch", Content: 'L???y ????? d??i ????y nh??n chi???u cao r???i chia cho 2 <br> (S = a x h : 2) <br> K?? hi???u: S l?? di???n t??ch, a l?? ????? d??i ????y, h l?? chi???u cao c???a h??nh tam gi??c.' }
    ],

    Shape_ID: "triangle",
    Practice: new Shape,
  },
  {
    Name: "H??nh thoi",
    Url: "./assets/images/rhombus.jpg",
    Defination: "L?? h??nh t??? gi??c c?? b???n c???nh b???ng nhau, c?? 4 ?????nh, 4 g??c (c??c g??c ?????i nhau b???ng nhau). Hai ???????ng ch??o vu??ng g??c v???i nhau v?? c???t nhau t???i trung ??i???m c???a m???i ???????ng.",

    Formula: [
      { Name: "Chu vi", Content: 'L???y ????? d??i m???t c???nh nh??n v???i 4 (c??ng ????n v??? ??o). <br> P = a x 4 <br> K?? hi???u: P l?? chu vi, a l?? ????? d??i 1 c???nh c???a h??nh thoi.' },
      { Name: "Di???n t??ch", Content: 'L???y t??ch ????? d??i c???a hai ???????ng ch??o chia cho 2 (c??ng ????n v??? ??o). <br> S = m x n : 2 <br> K?? hi???u: S l?? di???n t??ch, m, n l?? ????? d??i 2 ???????ng ch??o c???a h??nh thoi.' }
    ],

    Shape_ID: "rhombus",
    Practice: new Shape,
  },
  {
    Name: "H??nh h???p ch??? nh???t",
    Url: "./assets/images/rectangular.jpg",
    Defination: "L?? m???t h??nh kh??ng gian c?? 6 m???t (2 m???t ????y v?? 4 m???t b??n), 8 ?????nh, 12 c???nh, c?? 3 k??ch th?????c l?? chi???u d??i, chi???u r???ng v?? chi???u cao. Hai m???t c???a h??nh h???p ch??? nh???t kh??ng c?? c???nh chung g???i l?? hai m???t ?????i di???n v?? c?? th??? xem ch??ng l?? hai m???t ????y, c??c m???t c??n l???i ???????c xem l?? c??c m???t b??n.",

    Formula: [
      { Name: "Di???n t??ch xung quanh", Content: 'L???y chu vi ????y nh??n v???i chi???u cao (c??ng ????n v??? ??o) <br> S = (a + b) x 2 x h <br> K?? hi???u: S l?? di???n t??ch xung quanh, a l?? chi???u d??i, b l?? chi???u r???ng, h l?? chi???u cao c???a h??nh h???p ch??? nh???t.' },
      { Name: "Di???n t??ch to??n ph???n", Content: 'L???y di???n t??ch xung quanh c???ng v???i di???n t??ch 2 ????y <br> S = (a + b) x 2 x h + (a x b x 2) <br> K?? hi???u: S l?? di???n t??ch to??n ph???n, a l?? chi???u d??i, b l?? chi???u r???ng, h l?? chi???u cao c???a h??nh h???p ch??? nh???t.' },
      { Name: "Th??? t??ch", Content: 'L???y chi???u d??i nh??n v???i chi???u r???ng r???i nh??n v???i chi???u cao (c??ng ????n v??? ??o) \
      <br> V = a x b x h <br> K?? hi???u: V l?? th??? t??ch, a l?? chi???u d??i, b l?? chi???u r???ng, h l?? chi???u cao c???a h??nh h???p ch??? nh???t.' }
    ],

    Shape_ID: "hinhhopchunhat",
    Practice: new Shape,
  },
  {
    Name: "H??nh l???p ph????ng",
    Url: "./assets/images/hinhlapphuong.jpg",
    Defination: 'L?? m???t h??nh kh??ng gian c?? 6 m???t, 8 ?????nh, 12 c???nh. C??c m???t c???a h??nh l???p ph????ng ?????u l?? h??nh vu??ng c?? k??ch th?????c b???ng nhau (?????u c?? 6 m???t b???ng nhau). H??nh l???p ph????ng ch??? c?? duy nh???t 1 k??ch th?????c',

    Formula: [
      { Name: "Di???n t??ch xung quanh", Content: 'L???y di???n t??ch m???t m???t r???i nh??n v???i 4  <br> S = a x a x 4 <br> K?? hi???u: S l?? di???n t??ch xung quanh, a l?? c???nh c???a h??nh vu??ng.' },
      { Name: "Di???n t??ch to??n ph???n", Content: 'L???y di???n t??ch m???t m???t r???i nh??n v???i 6 <br> S = a x a x 6 <br> K?? hi???u: S l?? di???n t??ch to??n ph???n, a l?? c???nh c???a h??nh vu??ng.' },
      { Name: "Th??? t??ch", Content: 'L???y c???nh nh??n c???nh nh??n c???nh <br> V = a x a x a <br> K?? hi???u: V l?? th??? t??ch, a l?? c???nh c???a h??nh vu??ng.' }
    ],

    Shape_ID: "hinhlapphuong",
    Practice: new Shape,
  },
  {
    Name: "H??nh tr???",
    Url: "./assets/images/hinhtru.jpg",
    Defination: "L?? m???t h??nh h???c kh??ng gian gi???i h???n b???i m???t tr??? (m???t b??n) v?? hai ????y l?? hai ???????ng tr??n b???ng nhau.",
    Formula: null,
    Shape_ID: "hinhtru",
    Practice: "",
  },
  {
    Name: "H??nh c???u",
    Url: "./assets/images/hinhcau.jpg",
    Defination: "L?? m???t h??nh kh??ng gian ???????c t???o ra khi quay n???a h??nh tr??n m???t v??ng quanh ???????ng k??nh c???a h??nh tr??n ????. H??nh c???u c??n g???i l?? m???t kh???i tr??n ",
    Formula: null,
    Shape_ID: "hinhcau",
    Practice: "",
  }
];

