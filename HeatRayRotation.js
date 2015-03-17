#pragma strict

//default radius and radius movement values
var radius : float = 6.0;
var radiusIncrement : float = 4.0;
//default angle and angle movement values
var angle : float = 0.0;
var angleIncrement : float = 1.5;
var angleDirection : int = 1;
//end of laser hitbox object
var hitBox : Transform;
var helperCircle : Circle;
//change direction cooldown
var changeCooldown : float = 3.0;
var changeTime : float = 0.0;
var mat_ready : Material;
var mat_cooldown : Material;
//nuke attack
var nukeCooldown : float = 15.0;
var nukeTime : float = 0.0;
var nukeParticles : ParticleSystem; 
//gui
var gui : MainGUI;

function Start () {
}

function Update () {
	var lineRenderer : LineRenderer = GetComponent(LineRenderer);
	GetComponent(SphereCollider).enabled = false;
	
	//x and z positions that the line and hitbox will move to
	var x : float;
	var z : float;
	x = (radius * Mathf.Cos(angle));
	z = ((radius * Mathf.Sin(angle)));	
    var nextPos : Vector3 = Vector3(x, 0.2, z);
    
    //radius controls
	if(Input.GetKey("up") || Input.GetKey("w"))
		if(radius <= 7)	
			radius += (radiusIncrement * Time.deltaTime);
		else 
			radius = 7;
	if(Input.GetKey("down") || Input.GetKey("s"))
		if(radius >= 1)
			radius -= (radiusIncrement * Time.deltaTime);
		else
			radius = 1;
			
	//direction controls
	if(changeTime == 0) {
		hitBox.renderer.material = mat_ready;
		if(Input.GetKey("q") || Input.GetKey("z")) {
			angleDirection *= -1;
			changeTime = changeCooldown;
		}
	}
	else {
		hitBox.renderer.material = mat_cooldown;
		changeTime -= Time.deltaTime;
		if(changeTime < 0.0)
			changeTime = 0.0;
	}
	
	//nuke attack
	if(nukeTime == 0.0) {
		if(Input.GetKey("x") || Input.GetKey("e"))
		{
			nukeParticles.Emit(50);
			GetComponent(SphereCollider).enabled = true;
			nukeTime = nukeCooldown;
		}
	}
	else {
		nukeTime -= Time.deltaTime;
		if(nukeTime < 0.0)
			nukeTime = 0.0;
	}
		    
    //increments angle for next position
    angle += (angleDirection) * (angleIncrement * Time.deltaTime);
    
    //sets the position of the line and hitbox
    lineRenderer.SetPosition(1, nextPos);  
    hitBox.position = nextPos;
    
    //updating helper circle variables
    helperCircle.xradius = radius;
    helperCircle.zradius = radius;
    helperCircle.segments = 20;
}

function OnTriggerEnter (theCollider : Collider) {
	if(theCollider.tag == "Enemy") {
		Destroy(theCollider.gameObject);
		gui.EnemyKilled();
		}
}

function OnGUI () {
	GUI.color = Color.black;
	GUI.Label (new Rect (650,480,200,40), "Nuke Cooldown: " + Mathf.Round(nukeTime));
}