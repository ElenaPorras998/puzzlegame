function puzzleGame(selector,image, rows, cols){
    var self = this;
    this._game = $(selector);
    this._image = image;
    this._cols = cols;
    this._rows = rows;
    this._pieces = [];
    this._delay = 1500;


    var $image = $('<img style="display:none" src="'+image+'"/>');
    $('body').append($image);

    $image.load(function(){
        self._imageDimensions = {
            width: $image.width(),
            height: $image.height()
        };

        self._game.css({
            height: (self._game.width() * self._imageDimensions.height / self._imageDimensions.width) + 'px'
        });

        self._gameDimensions = {
            width: self._game.width(),
            height: self._game.height()
        };

        self._pieceDimensions = {
            width: self._gameDimensions.width / self._cols,
            height: self._gameDimensions.height / self._rows
        };

        self.createPieces(rows, cols);
    });

    $image.error(function(){
        self._game.html('<h2>Image not loaded!</h2>');
    });
}

puzzleGame.prototype.createPieces = function(rows, cols){
    this._game.css({
        position: 'relative'
    });

    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){

            this.createPiece(i, j);
        }
    }

    var self = this;
    setTimeout(function(){
        self.shufflePieces();
    }, this._delay);

};

puzzleGame.prototype.createPiece = function(x, y){
    var $div = $('<div></div>');

    $div.css({
        position: 'absolute',
        top: this._pieceDimensions.height * y,
        left: this._pieceDimensions.width * x,
        width: this._pieceDimensions.width,
        height: this._pieceDimensions.height,
        'background-image': 'url("' + this._image + '")',
        'background-size': (100 * this._cols) + '% ' + (100 * this._rows) + '%',
        'background-position': ( 100 / (this._cols - 1) * x )  + '% ' + ( 100 / (this._rows - 1) * y ) + '%',
    });

    this._game.append($div);
    this._pieces.push($div);
};

puzzleGame.prototype.shufflePieces = function(){

    var heightRatio = (this._gameDimensions.height - this._pieceDimensions.width) / this._gameDimensions.height;
    var widthRatio = (this._gameDimensions.width - this._pieceDimensions.width) / this._gameDimensions.width;

    for(var i = 0; i < this._pieces.length; i++){
        this._pieces[i].css({
            top: Math.round(Math.random() * 100 * heightRatio) + '%',
            left: Math.round(Math.random() * 100 * widthRatio) + '%',
        });
    }

    this.play();
};

puzzleGame.prototype.play = function(){
    // your game logic here!

};