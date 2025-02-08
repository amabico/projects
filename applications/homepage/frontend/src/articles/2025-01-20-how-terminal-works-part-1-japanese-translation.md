---
title: "2025-01-20 How terminal works. Part 1: Xterm, user input 意訳"
category: technology
created_at: 2025-01-20
---

[How terminal works. Part 1: Xterm, user input](https://kevroletin.github.io/terminal/2021/12/11/how-terminal-works-in.html) の意訳

## 動機

一連の記事で、現代的なターミナルとコマンドラインツールがどのように動いているか説明する。最初のゴールは、経験して学ぶことである。議論の各要素でデバッグするためのLinuxツールを提供する。我々の関心は物事がいかに動いているか探索することにある。なぜ物事がそのように動いているのかの理解には、読者には次の素晴らしい記事を読むことをお勧めする

- [The TTY demystified](https://www.linusakesson.net/programming/tty/)
- [A Brief Introduction to termios](https://blog.nelhage.com/2009/12/a-brief-introduction-to-termios/)

そして、コンピュータ歴史博物館に訪れましょう

- [ASR 33 Teletype demo (restoration Part 10)](https://www.youtube.com/watch?v=S81GyMKH7zw)
- [The IBM 1401 compiles and runs FORTRAN II](https://www.youtube.com/watch?v=uFQ3sajIdaM)

私は単にLinuxについて話すが、多くの議論される概念は他のUnix-likeなシステムにも適用できることに留意頂きたい

私は、コマンドラインツールを学ぶ上で”経験して学ぶ”方法を経たので、今回の記事でもその方法を選択した。私の場合、全てを理解した後、ピンと来る瞬間はなかった。代わりに、

主な

## 導入

コマンドラインシェルの一般的利用に対する不正確な図から始めよう

```
            (1)   (2)  (3)       
user <---> xterm <---> bash
```

ユーザーはbashと仮想terminalであるxtermを通じてやりとりをする。xtermはGUIアプリケーションで"キー押下"を受け取り、対応する文字を双方向ファイルハンドルに書き込む(2)。Bashはその文字を(2)から読み込み処理を行った後、同じファイルハンドル(2)を用いて結果をxtermに送る。XtermはBashの出力を(2)から読みスクリーンに描画する。(2)は"単なるファイル"に過ぎずやりとりは非常に単純にみえる。

> If the user asks bash to execute a command, let’s say cat log.txt then bash spawns cat which uses the same filehandle to send its output to xterm:

ユーザーがbashにコマンドを入れると、例えば`cat log.txt`とすると、Bashはxterm`cat`が発生し、

```
                       bash
            (1)   (2)  (4)       
user <---> xterm <---> cat
```