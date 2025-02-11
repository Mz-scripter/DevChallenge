from django.db import models

class Leaderboard(models.Model):
    username = models.CharField(max_length=50)
    score = models.IntegerField(default=0)
    max_streak = models.IntegerField(default=0)
    total_score = models.IntegerField(default=0)
    
    def save(self, *args, **kwargs):
        self.total_score = self.score + (self.max_streak * 2)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.username} - {self.total_score}"