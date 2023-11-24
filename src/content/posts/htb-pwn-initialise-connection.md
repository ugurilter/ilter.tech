---
title: "PWN - Initialise Connection"
publishedAt: 2023-03-21
description: "HacktheBox CTF - Cyber Apocalypse"
isPublish: true
---

```
Initialise Connection
In order to proceed, we need to start with the basics. Start an instance, connect to it via $ nc e.g. nc 127.0.0.1 1337 and send "1" to get the flag.

Points: 300
Difficulty: Very Easy
```

In this challenge you are only given a docker instance that you can boot up, so we will need to connect to it first.

After the docker is initialized i quickly connect to my instance to be welcomed by a prompt to which all i had to do was to send '1' as input to solve the challenge.

![HTB](/images/htb/pwn/init_conn/flag.png)

```
Flag: HTB{g3t_r34dy_f0r_s0m3_pwn}
```
