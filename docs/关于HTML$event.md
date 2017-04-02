## 在显示 pdf 文件的时候，遇到了一个问题：如何能够通过鼠标点击翻页

解决办法：在 pdf-viewr 上加 click点击事件，通过获取 pdf 文件的尺寸，然后根据鼠标点击的坐标判断 翻页（上一页/下一页）

这里，记录一下 Html 中的 event 对象的属性

```
MouseEvent
altKey:false
bubbles:true
button:0
buttons:0
cancelBubble:false
cancelable:true
clientX:887      --------------------
clientY:199      --------------------
composed:true
ctrlKey:false
currentTarget:null
defaultPrevented:false
detail:1
eventPhase:0
fromElement:null
isTrusted:true
layerX:65       ---------------------  相对于当前 layer 的 X 偏移量
layerY:444      ---------------------  相对于当前 layer 的 Y 偏移量
metaKey:false
movementX:0     ---------------------
movementY:0     ---------------------
offsetX:66      ---------------------
offsetY:444     ---------------------
pageX:887       ---------------------
pageY:516       ---------------------
path:Array[16]
relatedTarget:null
returnValue:true
screenX:888     ---------------------
screenY:319     ---------------------
shiftKey:false
sourceCapabilities:InputDeviceCapabilities
srcElement:canvas
target:canvas
timeStamp:417936.76000000007
toElement:canvas
type:"click"
view:Window
which:1
x:887           ---------------------
y:199           ---------------------
```