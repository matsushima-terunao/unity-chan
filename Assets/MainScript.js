/**
 * メインスクリプト。
 *
 * @author 2014/08/30 matsushima
 */

#pragma strict

/** プレイヤー */
var player: GameObject;
/** 敵 */
var enemyPrefab: GameObject;
/** 敵 */
var enemies: GameObject[] = new GameObject[10];
/** デバッグテキスト */
static var debugTexts:Hashtable = new Hashtable();

function Start () {
	player = GameObject.Find("unitychan_dynamic_locomotion");
}

function Update () {
	// 敵生成
	for (var i: int = 0; i < enemies.length; ++ i) {
		if (null == enemies[i]) {
			var position: Vector3 = Vector3(
				player.transform.position.x + 10 * Mathf.Sin(player.transform.eulerAngles.y * Mathf.PI / 180) + 10 * Random.value - 5,
				0,
				player.transform.position.z + 10 * Mathf.Cos(player.transform.eulerAngles.y * Mathf.PI / 180) + 10 * Random.value - 5);
			var angle: Quaternion = Quaternion(0, Vector3.Angle(position, player.transform.position), 0, 1);
			enemies[i] = Instantiate(enemyPrefab, position, angle);
			break;
		}
	}
}

function OnGUI() {
	// デバッグテキスト表示
	var y:int = 0;
	for (var k:Object in debugTexts.Keys) {
		GUI.Label(Rect(0, y * 20, 400, 20), k + ":" + debugTexts[k].ToString());
		++ y;
	}
}

static function Log(key:String, text:Object) {
	// デバッグテキスト表示登録
	debugTexts[key] = text;
	// デバッグテキストログ出力
	print(key + ":" + text);
}
