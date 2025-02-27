import express, { Request, Response, Router } from "express";

const router: Router = express.Router();
const newsArticles = [{title: "Donald Trump is gay", description: "Vandaag is donald trump uit de kast gekomen."}, {title: "Barack Obama did a dap", description: "Hij leeft nog zoals hij 16 was."}, {title: "Bavo De Bondt heeft een lange pink", description: "Danne lange hand"}];

const postFetch = async (input: string) => {
    try {
        const response = await fetch("https://api.deweirdt.be/games/index.php", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ gamekey: "Maartens_G4m3", username: input }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error posting data:", error);
    }
}

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
    res.render("result", { title: "Challenge resultaat", boodschap: message });

    const usernameInputValue: string = req.body.username?.trim() || "";    
    if(isCorrect) {
        postFetch(usernameInputValue);
    }
});

router.get("/news", (req: Request, res: Response): void => {
    res.render("news", { title: "Article", kanker: newsArticles })
});

//redirect get request op /quiz naar /
router.get("/quiz", (req: Request, res: Response): void => {
    res.redirect("/");
});



export default router;
