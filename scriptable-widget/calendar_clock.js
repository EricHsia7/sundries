// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-brown; icon-glyph: magic;
const settings = {
  'background':'#2d719c',
  'color':'#fff'
}
function getwsize() {
  var sizemap = {
  'z428x926':['170x170','364x170','364x382'],
'z414x896':['169x169','360x169','360x379'],
'z414x736':['159x159','348x157','348x357'],
'z390x844':['158x158','338x158','338x354'],
'z375x812':['155x155','329x155','329x345'],
'z375x667':['148x148','321x148','321x324'],
'z360x780':['155x155','329x155','329x345'],
'z320x568':['141x141','292x141','292x311'],
'z768x1024':['120x120','260x120','260x260','540x260'],
'z810x1080':['124x124','272x124','272x272','568x272'],
'z834x1112':['132x132','288x132','288x28','600x288'],
'z820x1180':['136x136','300x136','300x300','628x300'],
'z834x1194':['136x136','300x136','300x300','628x300'],
'z1024x1366':['160x160','356x160','356x356','748x356']
  }
  var widgetsize = config.widgetFamily ;
  if(widgetsize === 'small') {
    widgetsize = 0
  }
  if(widgetsize === 'medium') {
    widgetsize = 1
  }
  if(widgetsize === 'large') {
    widgetsize = 2
  }
  if(widgetsize === 'extraLarge') {
    widgetsize = 3
  }
  if(widgetsize === undefined) {
  return '0x0'
}
  var screensi = Device.screenSize()
  var scrsi_min = Math.min(screensi.width,screensi.height)
  var scrsi_max = Math.max(screensi.width,screensi.height)
  var scrstr = 'z' + scrsi_min + 'x' + scrsi_max
  return sizemap[scrstr][widgetsize]
}



var widget = new ListWidget()
widget.setPadding(10, 10, 10, 10)
widget.backgroundColor = new Color(settings.background, 100)
var widget_size = getwsize()
var widget_width = parseInt(widget_size.split('x')[0])-20
var widget_height = parseInt(widget_size.split('x')[1])-20

var all = widget.addStack()
all.layoutHorizontally()
all.size = new Size(widget_width, widget_height)
all.setPadding(0, 0, 0, 0)

var area1_width = widget_width*0.4
var area1 = all.addStack()
area1.size = new Size(area1_width, widget_height)
area1.setPadding(0, 0, 0, 0)
area1.layoutVertically()

var Today = new Date()


var dayname = '日一二三四五六' ;
var daynamearr = dayname.split('')
var tddate = area1.addStack() ;
tddate.layoutVertically()
tddate.setPadding(0, 0, 0, 0)
tddate.size = new Size(area1_width, 50)
tddate.topAlignContent()
var tddayname = tddate.addText('星期' + daynamearr[Today.getDay()])
tddayname.font = Font.lightSystemFont(18)
tddayname.textColor = new Color(settings.color, 100)
tddayname.leftAlignText()


var str = (Today.getMonth()+1) + '月' + Today.getDate() + '日'
var tddatetext = tddate.addText(str);
tddatetext.textColor = new Color(settings.color, 100)
tddatetext.font = Font.lightSystemFont(24)
tddatetext.leftAlignText()

var note = area1.addStack()
note.layoutVertically()
note.size = new Size(area1_width, (widget_height-50))
note.setPadding(0, 0, 0, 0)
note.topAlignContent()

var note_text = args.widgetParameter
    if(note_text === null || note_text === '') {
      note_text = '在Parameter欄位輸入文字。'
    }

var notetext = note.addText(note_text)
notetext.textColor = new Color(settings.color, 100)
notetext.font = Font.boldSystemFont(20)
notetext.leftAlignText()

var area2_width = widget_width*0.6
var area2 = all.addStack()
area2.size = new Size(area2_width,widget_height)
area2.layoutVertically()
area2.topAlignContent()
area2.setPadding(0, 0, 0, 0)

const endDate = new Date()
    endDate.setDate(Today.getDate() + 3)
const events = await CalendarEvent.between(Today, endDate)
var events_len = events.length
if(events_len > 3) {
  events_len = 3
}
for(var e = 0;e<events_len;e++) {
  var this_event = events[e]
  var id = this_event.identifier
  var starttime = this_event.startDate
  var title = this_event.title
  
  var color = '#' + this_event.calendar.color.hex

  var ev_bg = area2.addStack()
  ev_bg.size = new Size(area2_width, widget_height/events_len - 5*(events_len-1))
  ev_bg.backgroundColor = new Color('#fff', 0.8)
  ev_bg.cornerRadius = 5
  
  var ev = ev_bg.addStack()
  ev.size = new Size(area2_width, widget_height/events_len - 5*(events_len-1))
  ev.backgroundColor = new Color(color, 0.125)
  ev.cornerRadius = 5
  var line_box = ev.addStack()
  line_box.size = new Size(10, widget_height/events_len - 5*(events_len-1))
  line_box.centerAlignContent()
  line_box.layoutHorizontally()
  line_box.addSpacer(1.2)
  var line = line_box.addStack()
  line.size = new Size(3, widget_height/events_len - 5*(events_len-1) - 5)
  line.backgroundColor = new Color(color, 100)
  line.cornerRadius = 2
  
  var title_box = ev.addStack()
  title_box.size = new Size(area2_width-10, widget_height/events_len - 5*(events_len-1))
  title_box.layoutVertically()
  var title_text = title_box.addText(title)
  title_text.textColor = new Color(color, 100)
title_text.font = Font.systemFont(15)
title_text.leftAlignText()
  
  //ev.url = 'calshow://x?eventid=' + id
  if(e === 0 || e === (events_len-2)) {
    var s = area2.addStack()
    s.size = new Size(area2_width, 5)
  }
}

if (config.runsInWidget) {
Script.setWidget(widget)
Script.complete()
}
else {
  
}
