var ClozeCard = function(text, cloze){
	this.fullText = text;
	this.cloze = cloze;
	this.partial = text.replace(cloze, "...");
};

ClozeCard.prototype.checkPartial = function() {

		if (this.partial === this.fullText) {
			console.log("Error: Cloze-deleted portion was not included in text. Try again.");
			return true;
		};
	};

module.exports = ClozeCard;