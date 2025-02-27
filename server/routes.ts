import express, { Request, Response, Router } from "express";

const router: Router = express.Router();


// Homepagina
router.get("/", (req: Request, res: Response): void => {
  res.render("index", { title: "Maarten's Secret Challenge" });
});

// Quiz verwerken
router.post("/quiz", (req: Request, res: Response): void => {
    const correctAntwoord: number = 42;
    const userAntwoord: number = parseInt(req.body.antwoord?.trim()) || 0;
    const isCorrect: boolean = userAntwoord === correctAntwoord;
    const message: string = isCorrect ? "Gefeliciteerd, je hebt het voltooid!" : "Fout! 😢 Probeer opnieuw.";
    
    if(isCorrect) {
        fetch(
            "https://api.deweirdt.be/games/index.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({username: req.body.username, game_key: "Maartens_G4m3"})
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .then(error => console.error(error));
    }
    res.render("result", { title: "Challenge resultaat", boodschap: message });
});

//redirect get request op /quiz naar /
router.get("/quiz", (req: Request, res: Response): void => {
    res.redirect("/");
});



export default router;
