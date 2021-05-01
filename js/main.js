// JavaScript source code
var nine_value = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var index = 0;
var radar;
var isTestMode = false

function nineOut(callback) {
    $("#nine_c_one_txt").fadeOut("fast");
    $("#nine_c_two_txt").fadeOut("fast", callback);
};

function nineIn() {
    $("#nine_c_one_txt").fadeIn("fast");
    $("#nine_c_two_txt").fadeIn("fast");
    /*
    $("#nine_c_one").removeAttr("data-upgraded");
    componentHandler.upgradeElement(document.getElementById('nine_c_one'));
    $("#nine_c_two").removeAttr("data-upgraded");
    componentHandler.upgradeElement(document.getElementById('nine_c_two'));
    */
};

function setValues(i) {
    var nine = datas[i];
    var count = i + 1;
    $("#nine_title").html("No. " + count + " - " + (((count * 100 / 144).toFixed(0))) + "%");
    var value = nine[0];
    $("#nine_c_one").val(value.value);
    $("#nine_c_one_txt").html(value.name);
    value = nine[1];
    $("#nine_c_two").val(value.value);
    $("#nine_c_two_txt").html(value.name);
};

function getValues(item) {
    var i = item.attr("value");
    nine_value[i]++;
};

function nineEnd() {
    
    $("#nine_select").hide();
    $("#nine_result").show();
    
    const enneagramNames = ["Reformer", "Helper", "Achiever", "Individualist", "Investigator", "Loyalist", "Enthusiast", "Challenger", "Peacemaker"]
    let enneagramResults = enneagramNames.map((label, idx) => {
      return {
        label:label,
        number:idx+1,
        value:nine_value[idx],
        url:`https://www.enneagraminstitute.com/type-${idx+1}`
      }
    })
    enneagramResults.sort((a, b)=>a.value<b.value?1:-1)
    const html = "<p>Here are your scores for each of the enneagram types, highest score first. Tap the links for a more detailed description of the type.</p><ul>"+enneagramResults.map(result => {
      return `<li><a target="_blank" href="${result.url}">Type ${result.number} (${result.label})</a> - ${result.value}</li>`
    }).join("")+"</ul>"
    $("#nine_title").text(`You are most likely Enneagram type ${enneagramResults[0].number} (${enneagramResults[0].label})`);
    $("#nine_result").html(html)
    
};
const test = function() {
  isTestMode = true
  var btns = $("button[name='nine_c']")
  for (var i = 0;i<144;i++) {
    $(btns[Math.floor(Math.random()*2)]).trigger("click")
  }
}
$(document).ready(function () {
    
    
    $("button[name='nine_c']").click(function () {
        index++;
        if (index >= datas.length) {
            nineEnd();
        } else {
            var item = $(this);
            if (isTestMode) {
              getValues(item);
              setValues(index);
            } else {
              nineOut(function () {
                  getValues(item);
                  setValues(index);
                  nineIn();
              });
            }
          
        }
    });

    $("#nine_start").click(function (e) {
        if (e.altKey) {
          $("#nine_help").hide()
          setValues(index);
          $("#nine_select").show();
          nineIn();
          test();
        } else {
          $("#nine_help").fadeOut(300, function () {
              $(this).hide();
              setValues(index);
              $("#nine_select").show();
              nineIn();
          });
        }
        
    });

    // First 
    $("#canvas").hide();
    $("#nine_select").hide();
    $("#nine_result").hide();
});
