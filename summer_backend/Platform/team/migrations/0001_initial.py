# Generated by Django 4.2.4 on 2023-09-03 00:20

from django.db import migrations, models
import django.db.models.deletion
import team.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Membership',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role', models.CharField(choices=[('创建者', 'CREATOR'), ('管理员', 'ADMIN'), ('成员', 'MEMBER')], default='成员', max_length=20)),
            ],
            options={
                'db_table': 'membership',
            },
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('notice', models.CharField(max_length=255, null=True)),
                ('avatar', models.ImageField(blank=True, null=True, upload_to=team.models.Team.team_directory_path, verbose_name='avatar')),
                ('avatar_url', models.CharField(max_length=255, null=True)),
                ('description', models.CharField(max_length=255, null=True)),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='teams_created', to='user.user')),
                ('members', models.ManyToManyField(through='team.Membership', to='user.user')),
            ],
            options={
                'db_table': 'team',
            },
        ),
        migrations.AddField(
            model_name='membership',
            name='team',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='team.team'),
        ),
        migrations.AddField(
            model_name='membership',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.user'),
        ),
        migrations.CreateModel(
            name='Invitation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('inviter', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='invitations_sent', to='user.user')),
                ('recipient', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='invitations_received', to='user.user')),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='team.team')),
            ],
        ),
    ]
