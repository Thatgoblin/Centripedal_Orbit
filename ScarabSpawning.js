#pragma strict

var canSpawn : boolean = true;
var spawnInterval : float = 3.0;
var spawnTimer : float = spawnInterval;
var scarab : Transform;

function Start () {

}

function Update () {
	spawnTimer -= Time.deltaTime * 1;
	
	if(spawnTimer <= 0.0)
	{
		var ranRad : float = Random.Range(9.0,10.0);
		var ranAngle : float = Random.Range(0.0, Mathf.PI * 2);
		var nextSpawn : Vector3 = Vector3((ranRad * Mathf.Cos(ranAngle)), 0.3, ((ranRad * Mathf.Sin(ranAngle))));
		Instantiate(scarab, nextSpawn, Quaternion.identity);
		if(spawnInterval > 0.1)
			spawnInterval -= 0.01;
		spawnTimer = spawnInterval;
	}
	
	
}