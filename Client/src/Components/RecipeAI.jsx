async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/flax-community/t5-recipe-generation",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

query({"inputs": "The answer to the universe is"}).then((response) => {
	console.log(JSON.stringify(response));
});