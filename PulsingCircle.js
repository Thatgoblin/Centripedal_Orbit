#pragma strict

//public settable variables
var fadeMultiplier : float = 1;
var radiusMultiplier : float = 1;
var fadeInTime : float = 0.35;
var fadeOutTime : float = 0.25;
var circleWidth : float = 0.01;
var mouseFade : float;
var pulseColor : Color;
//line renderer
private var line : LineRenderer;
//variables related to the line renderer
private var segments : int = 100;
private var xradius : float = 0.1;
private var yradius : float = 0.1;
private var lineAlpha : float = 0.001;
private var fadeOut : int = 0;

private var copied : boolean = false;

function Start () {
	//initialize the color and alpha
	if(copied == true) {
		gameObject.AddComponent(LineRenderer);
	}
	line = gameObject.GetComponent.<LineRenderer>();
	line.SetVertexCount(segments + 1);
	line.useWorldSpace = false;
	line.SetWidth(0.075, 0.075);
	line.material = new Material(Shader.Find("Particles/Alpha Blended"));
	pulseColor.a = lineAlpha * mouseFade;
	line.SetColors(pulseColor,pulseColor);
	//other initialization
}

function Update () {
	if(copied == false) {
		//fading the alpha in and out
		if(fadeOut == 0){
			lineAlpha += fadeInTime * fadeMultiplier * Time.deltaTime;
		}
		else {
			lineAlpha -= fadeOutTime * fadeMultiplier * Time.deltaTime;
		}
		//if the alpha is 100% then fade out
		if(lineAlpha >= 0.5f && fadeOut == 0){
			fadeOut = 1;
		}
		//destroy the object if the alpha is 0
		if(fadeOut == 1 && lineAlpha <= 0){
			Destroy(gameObject);
		}
		
		//set the color/alpha of the circle
		//pulseColor.a = lineAlpha;
		pulseColor.a = lineAlpha * mouseFade;
		line.SetColors(pulseColor,pulseColor);
		//increases the radius
		xradius += 1 * radiusMultiplier * Time.deltaTime;
		yradius += 1 * radiusMultiplier * Time.deltaTime;
		CreatePoints();
	}
}

//create a circle
function CreatePoints() {
	var x : float;
	var y : float;
	var z : float = 0;
	var angle : float = 20;
	//create the circle
	for (var i = 0; i < (segments + 1); i++) {
		x = Mathf.Sin (Mathf.Deg2Rad * angle) * xradius;
		y = Mathf.Cos (Mathf.Deg2Rad * angle) * yradius;
		line.SetPosition(i,new Vector3(x,y,z));
		angle += (360f / segments);
	}
}

function isCopy() {
	copied = true;
}