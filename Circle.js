#pragma strict

var segments : int = 100;
var xradius : float;
var zradius : float;
var line : LineRenderer;

function Start () {
	
}

function Update () {
	line = gameObject.GetComponent(LineRenderer);
	line.SetVertexCount(segments + 1);
	line.useWorldSpace = false;
	CreatePoints();
}

function CreatePoints() {
	var x : float;
	var y : float = 0.5;
	var z : float;
	var angle : float = 20;
	
	for (var i = 0; i < (segments + 1); i++) {
		x = Mathf.Sin (Mathf.Deg2Rad * angle) * xradius;
		z = Mathf.Cos (Mathf.Deg2Rad * angle) * zradius;
		
		line.SetPosition (i,new Vector3(x,y,z));
		angle += (360f / segments);
	}
}