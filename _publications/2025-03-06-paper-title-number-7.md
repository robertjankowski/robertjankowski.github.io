---
title: "Task complexity shapes internal representations and robustness in neural networks"
collection: publications
permalink: /publication/2025-08-07
excerpt: ''
date: 2025-08-07
venue: 'arxiv'
paperurl: 'https://arxiv.org/abs/2508.05463'
citation: 'Jankowski, R., Radicchi, F., Serrano, M., Boguñá, M., & Fortunato, S. (2025). Task complexity shapes internal representations and robustness in neural networks. arXiv preprint arXiv:2508.05463.'
---

Neural networks excel across a wide range of tasks, yet remain black boxes. In particular, how their internal representations are shaped by the complexity of the input data and the problems they solve remains obscure. In this work, we introduce a suite of five data-agnostic probes-pruning, binarization, noise injection, sign flipping, and bipartite network randomization-to quantify how task difficulty influences the topology and robustness of representations in multilayer perceptrons (MLPs). MLPs are represented as signed, weighted bipartite graphs from a network science perspective. We contrast easy and hard classification tasks on the MNIST and Fashion-MNIST datasets. We show that binarizing weights in hard-task models collapses accuracy to chance, whereas easy-task models remain robust. We also find that pruning low-magnitude edges in binarized hard-task models reveals a sharp phase-transition in performance. Moreover, moderate noise injection can enhance accuracy, resembling a stochastic-resonance effect linked to optimal sign flips of small-magnitude weights. Finally, preserving only the sign structure-instead of precise weight magnitudes-through bipartite network randomizations suffices to maintain high accuracy. These phenomena define a model- and modality-agnostic measure of task complexity: the performance gap between full-precision and binarized or shuffled neural network performance. Our findings highlight the crucial role of signed bipartite topology in learned representations and suggest practical strategies for model compression and interpretability that align with task complexity.