export function dataBaseCheck(platform: App.Platform | undefined) {
	if (!platform?.env?.DB) {
		console.log('Database Connection not found.');
		return false;
	} else {
		return true;
	}
}
